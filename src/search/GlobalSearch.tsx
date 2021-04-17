import Autocomplete, { AutocompleteInputChangeReason } from '@material-ui/lab/Autocomplete'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ApolloClient } from '@apollo/client'
import { SearchNumberDocument, SearchNumberQuery, SearchStringDocument, SearchStringQuery } from '../generated/graphql'
import {
    Link as RouterLink
} from "react-router-dom"
import { fade, InputBase, Link, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

interface SearchResult {
    coin: string;
    type: string;
    value: string;
    info?: string;
}

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        border: '1px solid black'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}))

export function GlobalSearch({ client }: { client: ApolloClient<any> }) {

    const classes = useStyles()

    const [searchQuery, setSearchQuery] = useState("")

    const [searchLoading, setSearchLoading] = useState(false)

    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)

    const timeout = useRef<NodeJS.Timeout>()

    const search = useCallback(async (query: string) => {
        if (query.length === 0) {
            setSearchLoading(false)
            return
        }
        const searchedNumber = Number(query)
        if (Number.isFinite(searchedNumber) && searchedNumber >= 0 && Number.isInteger(searchedNumber)) {
            let res = await client.query<SearchNumberQuery>({ query: SearchNumberDocument, variables: { query: searchedNumber } })
            setSearchResults(
                res.data.coins.flatMap(coin => {
                    if (!coin.blockByHeight) {
                        return [] as SearchResult[]
                    } else {
                        return [{
                            coin: coin.name, type: "block", info: "#" + searchedNumber, value: coin.blockByHeight.hash
                        }] as SearchResult[]
                    }
                })
            )
        } else {
            let res = await client.query<SearchStringQuery>({ query: SearchStringDocument, variables: { query: query } })
            setSearchResults(
                res.data.coins.flatMap(coin => {
                    const res: SearchResult[] = []
                    if (coin.transaction) {
                        res.push({ coin: coin.name, type: "transaction", value: coin.transaction.txid })
                    }
                    if (coin.block) {
                        res.push({ coin: coin.name, type: "block", info: "#" + coin.block.height, value: query })
                    }
                    if (coin.address.balances.items.length > 0) {
                        res.push({ coin: coin.name, type: "address", value: coin.address.address })
                    }
                    return res
                })
            )
        }
        setSearchLoading(false)
    }, [client, setSearchLoading])

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
    }, [])

    const searchChange = useCallback((event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
        setSearchLoading(true)
        setSearchQuery(value)
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            search(value)
        }, 500)
    }, [setSearchQuery, search, setSearchLoading])

    return <Autocomplete
        fullWidth
        id="combo-box-demo"
        loading={searchLoading}
        inputValue={searchQuery}
        noOptionsText="No results"
        onInputChange={searchChange}
        filterOptions={(options) => {
            return options
        }}
        options={searchResults}
        getOptionLabel={(option: SearchResult) => option.value}
        getOptionSelected={(option: SearchResult, value: SearchResult) => option.value === value.value && option.coin === value.coin}
        onChange={(event: React.ChangeEvent<{}>, newValue) => setSelectedResult(newValue)}
        value={selectedResult}
        groupBy={(option: SearchResult) => option.coin}
        renderOption={(option: SearchResult) =>
            <Fragment>
                <Link
                    color="inherit"
                    component={RouterLink}
                    href={"/" + option.coin + "/" + option.type + option.value}
                    key={option.type + option.value} to={"/" + option.coin + "/" + option.type + "/" + option.value}
                    style={{ textOverflow: "ellipsis", overflow: "hidden" }}

                >
                    <div>
                        <span style={{ textTransform: "capitalize" }}>{option.type}</span>
                        {option.info && <span>&nbsp;{option.info}</span>}
                    </div>
                    <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{option.value}</div>
                </Link>
            </Fragment>
        }
        renderInput={(params: any) => <div className={classes.search} ref={params.InputProps.ref}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase

                placeholder="Transaction / Address / Block"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                {...params.inputProps}
            />
        </div>}
    />
}
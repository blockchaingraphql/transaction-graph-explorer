import { createStyles, Theme, withStyles, WithStyles, TableCell } from '@material-ui/core'
import { AutoSizer, Column, Dimensions, Index, Table, TableHeaderProps, TableCellProps, TableCellRenderer, IndexRange, OverscanIndexRange } from "react-virtualized"
import clsx from 'clsx'
import { Fragment } from 'react'

const styles = (theme: Theme) => createStyles({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    fullWidth: {
        width: '100% !important'
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer'
        //width: '100% !important'
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
    selected: {
        backgroundColor: 'rgba(220, 0, 78, 0.08)'
    }
})

interface Props extends WithStyles<typeof styles> {
    columns: { dataKey: string, numeric?: boolean, width: number, label: string, flexGrow?: number, flexShrink?: number }[]
    rowHeight: number
    headerHeight: number
    onRowClick?: any
    cellContentRenderer?: TableCellRenderer
    rowCount: number
    rowGetter: (info: Index) => any
    registerChild?: (registeredChild: any) => void
    onRowsRendered?: ((info: IndexRange & OverscanIndexRange) => void)
}

interface HeaderRendererProps extends TableHeaderProps {
    columnIndex: number
}

function VirtualizedTable({ columns, classes, rowHeight, headerHeight, onRowClick, rowCount, rowGetter, cellContentRenderer, registerChild, onRowsRendered }: Props) {

    const getRowClassName = (info: Index): string => {
        if (info.index === -1) {
            return clsx(classes.tableRow, classes.flexContainer)
        } else {
            return clsx(classes.fullWidth, classes.tableRow, classes.flexContainer, {
                [classes.tableRowHover]: onRowClick != null
            })
        }
    }

    if (!cellContentRenderer) cellContentRenderer = ({ cellData, columnIndex }: TableCellProps) => {
        return <Fragment>{cellData}</Fragment>
    }

    const cellRenderer = (props: TableCellProps) => {
        //const { columns, classes, rowHeight, onRowClick } = this.props;
        console.log("CELLRENDER ROWDATA", props.rowData)
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                    [classes.selected]: props.rowData.selected
                })}
                variant="body"
                style={{ height: rowHeight, maxWidth: '100%' }}
                align={(props.columnIndex != null && columns[props.columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellContentRenderer !== undefined ? cellContentRenderer(props) : props.cellData}
            </TableCell>
        )
    }

    const headerRenderer = (props: HeaderRendererProps) => {
        //const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[props.columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{props.label}</span>
            </TableCell>
        )
    }

    return <AutoSizer>
        {({ height, width }: Dimensions) => (
            <Table
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                height={height}
                width={width}
                rowHeight={rowHeight}
                gridStyle={{
                    direction: 'inherit',
                }}
                headerHeight={headerHeight}
                className={classes.table}
                scroll
                rowCount={rowCount}
                rowGetter={rowGetter}
                rowClassName={getRowClassName}
            >
                {columns.map((column, index) => {
                    return (
                        <Column
                            key={column.dataKey}
                            headerRenderer={(headerProps: TableHeaderProps) =>
                                headerRenderer({
                                    ...headerProps,
                                    columnIndex: index,
                                })
                            }
                            className={classes.flexContainer}
                            cellRenderer={cellRenderer}
                            dataKey={column.dataKey}
                            flexGrow={column.flexGrow}
                            flexShrink={column.flexShrink}

                            width={column.width}
                            label={column.label}
                        />
                    )
                })}
            </Table>
        )}
    </AutoSizer>

}

export const MuiVirtualizedTable = withStyles(styles)(VirtualizedTable)

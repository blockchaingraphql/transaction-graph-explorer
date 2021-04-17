import { Card, CardContent, CardHeader, Paper, Tab, Tabs } from "@material-ui/core"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { AddressOverview } from "./AddressOverview"
import { AddressTransactions } from "./AddressTransactions"



export function Address() {


    const { address } = useParams<{ coin: string, address: string }>()


    const [tabIndex, setTabIndex] = useState(0)

    const onTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue)
    }




    return <Card style={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader title="ADDRESS" subheader={address} />
        <CardContent style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
            <Paper style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", width: '100%' }}>
                <Tabs value={tabIndex} onChange={onTabChange} aria-label="simple tabs example">
                    <Tab label="Overview" />
                    <Tab label="Transactions" />
                    <Tab label="Balance chart" />
                </Tabs>
                {tabIndex === 0 && <AddressOverview />}
                {tabIndex === 1 && <AddressTransactions />}
                {tabIndex === 2 && 'BALANCE CHART TODO'}
            </Paper>
        </CardContent>
    </Card >
}
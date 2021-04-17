import { Card, CardActions, CardContent, CardHeader, Paper, Tab, Tabs } from "@material-ui/core"
import { useState } from "react"
import { useParams } from "react-router"
import { WalletAddresses } from "./WalletAddresses"
import { WalletOverview } from "./WalletOverview"
import { WalletTransactions } from "./WalletTransactions"


export function Wallet() {

    const { address } = useParams<{ coin: string, address: string }>()

    const [tabIndex, setTabIndex] = useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue)
    }

    return <Card style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
        <CardHeader title="WALLET" subheader={address} />
        <CardContent style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
            <Paper style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>

                <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example" style={{ flex: "0 1 auto" }}>
                    <Tab label="Summary" />
                    <Tab label="Transactions" />
                    <Tab label="Addresses" />
                </Tabs>
                {tabIndex === 0 && <WalletOverview />}
                {tabIndex === 1 && <WalletTransactions />}
                {tabIndex === 2 && <WalletAddresses />}
            </Paper>
        </CardContent>
        <CardActions disableSpacing>

        </CardActions>
    </Card>

}
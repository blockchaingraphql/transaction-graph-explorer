import { ApolloClient, ApolloConsumer } from "@apollo/client"
import { GlobalSearch } from "./search/GlobalSearch"
import { useAvailableCoinsQuery } from './generated/graphql'
import { Container } from "@material-ui/core"

export function Home() {

    const { data, loading } = useAvailableCoinsQuery(
    )


    if (loading) return <p>Loading...</p>


    return <Container maxWidth="sm">
        <ApolloConsumer>
            {(client: ApolloClient<object>) =>
                <GlobalSearch client={client} />
            }
        </ApolloConsumer>
        <div>
            {data?.coins.map(coin => coin.name).join(", ")}
        </div>
    </Container>
}
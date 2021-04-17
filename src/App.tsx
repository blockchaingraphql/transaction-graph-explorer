import './App.scss'
import { CssBaseline } from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import { Coin } from './Coin'
import { Home } from './Home'



function App() {

    return (
        <Router>
            <CssBaseline />
            <Switch>
                <Route path="/:coin">
                    <Coin />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default App

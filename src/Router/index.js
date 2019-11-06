import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShowAllInfo from "../components/ShowAllInfo"
// import List from './components/List'
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                < Switch>
                    <Route path='/'
                        exact component={ShowAllInfo}
                    />
                    <Route path='/list'
                        // component={List}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;

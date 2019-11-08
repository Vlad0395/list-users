import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UsersInfo from "../components/UsersInfo";
import List from '../components/List';
import Wrapper from '../components/Wrapper';

class Router extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <Wrapper>
                    < Switch>
                        <Route path='/'
                            exact component={UsersInfo}
                        />
                        <Route path='/list'
                            component={List}
                        />
                    </Switch>
                </Wrapper>
            </BrowserRouter>
        )
    }
}

export default Router;

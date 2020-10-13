import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}></Route>
        </Switch>
    </BrowserRouter>
)

export default Router;
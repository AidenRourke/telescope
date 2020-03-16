import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from "./Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/login" component={Login} />
                {/* Not Found */}
                <Route component={() => <Redirect to="/login" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

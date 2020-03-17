import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from 'App/Login';
import { UserPosts } from 'App/UserPosts';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route
          exact={true}
          path={'/posts'}
          component={UserPosts}
        />
        {/* Not Found */}
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

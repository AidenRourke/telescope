import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';

import { Login } from 'App/Login';
import { UserPosts } from 'App/UserPosts';
import { Post } from 'App/Post';
import { Admin } from "App/Admin";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Router: FC<Props> = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path="/login"
          render={props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          exact={true}
          path="/posts"
          render={props =>
            isAuthenticated ? <UserPosts {...props} setIsAuthenticated={setIsAuthenticated} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact={true}
          path={'/posts/:id'}
          render={props => (isAuthenticated ? <Post {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path={'/admin'}
          render={props => (isAuthenticated ? <Admin {...props} /> : <Redirect to="/login" />)}
        />
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

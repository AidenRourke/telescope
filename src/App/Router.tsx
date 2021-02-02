import React, { FC, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from 'App/Login';
import { UserPosts } from 'App/UserPosts';
import { Post } from 'App/Post';
import { Admin } from 'App/Admin';
import { Worlds } from 'App/Worlds';
import { World } from 'App/World';
import { Moment } from 'App/Moment';
import { UserContext } from 'Contexts/UserContext';

const Router: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path="/login"
          render={props => (!!user ? <Redirect to="/posts" /> : <Login {...props} />)}
        />
        <Route
          exact={true}
          path="/posts"
          render={props => (!!user ? <UserPosts {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path={'/posts/:id'}
          render={props => (!!user ? <Post {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path="/worlds"
          render={props => (!!user ? <Worlds {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path={'/worlds/:id'}
          render={props => (!!user ? <World {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path={'/worlds/:worldId/moments/:momentId'}
          render={props => (!!user ? <Moment {...props} /> : <Redirect to="/login" />)}
        />
        <Route
          exact={true}
          path={'/admin'}
          render={props => (!!user && user.isAdmin ? <Admin {...props} /> : <Redirect to="/login" />)}
        />
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

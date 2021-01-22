import React from 'react';
import ReactDOM from 'react-dom';
import 'fonts/DrukWide-Bold.ttf';
import './index.css';
import App from 'App/App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import config from './amplify_config';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {Auth} from 'aws-amplify';
import { setContext } from 'apollo-link-context';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

Amplify.Logger.LOG_LEVEL = 'DEBUG';

const httpLink = createHttpLink({
  // uri: 'http://orion-env.eba-mebv5f7k.us-east-1.elasticbeanstalk.com/graphql',
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext(async (_, something) => {
  // get the authentication token from local storage if it exists
  const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...something.headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Router from './Router';
import { UserContext } from 'Contexts/UserContext';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      await login();
    } catch (e) {
      setUser({});
    }
    setIsLoaded(true);
  };

  const logout = () => {
    setUser(null);
  };

  const login = async () => {
    const {
      signInUserSession: {
        accessToken: { payload },
      },
    } = await Auth.currentAuthenticatedUser();
    setUser({
      id: payload.username,
      isAdmin: payload['cognito:groups'].includes('modu-world-admin'),
    });
  };

  return (
    <AppContainer id="app">
      {isLoaded && (
        <DndProvider backend={HTML5Backend}>
          <UserContext.Provider value={{ user, logout, login }}>
            <Router />
          </UserContext.Provider>
        </DndProvider>
      )}
    </AppContainer>
  );
};

export default App;

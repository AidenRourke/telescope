import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Router from './Router';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
    setIsLoaded(true);
  }

  return (
    <AppContainer id="app">
      <DndProvider backend={HTML5Backend}>
        {isLoaded && <Router isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
      </DndProvider>
    </AppContainer>
  );
};

export default App;

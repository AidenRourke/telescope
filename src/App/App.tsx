import React from 'react';
import styled from 'styled-components';

import { black, white } from 'styles/colors';

import Router from './Router';

const AppContainer = styled.div`
  background-color: ${black};
  height: 100vh;
  color: ${white};
  position: relative;
`;

function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}

export default App;

import React, { FC, useState } from 'react';
import styled from 'styled-components';

import Router from './Router';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const Time = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const App: FC = () => {
  const [time, setTime] = useState<string>();
  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  return (
    <AppContainer>
      <Time>{time}</Time>
      <Router />
    </AppContainer>
  );
};

export default App;

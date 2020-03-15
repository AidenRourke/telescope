import React from 'react';
import styled from 'styled-components';

import { black, white } from 'styles/colors';

import './App.css';
import { Login } from 'app/login';

const AppContainer = styled.div`
    background-color: ${black};
    height: calc(100vh - 8rem);
    color: ${white};
    padding: 4rem;
    position: relative;
`;

function App() {
    return (
        <AppContainer>
            <Login />
        </AppContainer>
    );
}

export default App;

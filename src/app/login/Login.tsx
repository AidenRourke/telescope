import React, { FC } from 'react';
import styled from 'styled-components';

import { Button, Input } from 'components';

const LoginView = styled.div`
    font-size: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
`;

const Female = styled.img`
    position: absolute;
    bottom: 0;
    right: 25%;
    height: 80%;
    width: 35%;
    object-fit: cover;
`;

const Male = styled.img`
    position: absolute;
    bottom: 0;
    right: 4rem;
    height: 90%;
    width: 35%;
    object-fit: cover;
`;

const LoginForm = styled.div`
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 50%;
`;

const ModuWorld = styled.img`
    width: 100%;
`;

const Email = styled(Input)`
    margin-top: 4rem;
`;

const Password = styled(Input)`
    margin-top: 2rem;
`;

const Submit = styled(Button)`
    margin-top: 2rem;
`;

const Login: FC = () => {
    return (
        <LoginView>
            <Male src={require('assets/login_male.gif')} />
            <Female src={require('assets/login_female.gif')} />

            <LoginForm>
                <ModuWorld src={require('assets/modu_world.png')} />
                <Email placeholder="EMAIL" />
                <Password placeholder="PASSWORD" type="password" />
                <Submit>LOGIN</Submit>
            </LoginForm>
        </LoginView>
    );
};

export { Login };

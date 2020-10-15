import React, { FC, useReducer, useState, ChangeEvent, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { red } from 'styles/colors';
import { Button, Input } from 'Components';
import male from 'assets/login_male.gif';
import female from 'assets/login_female.gif';
import { UserContext } from '../../Contexts/UserContext';

const LoginView = styled.div`
  font-size: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4rem;
`;

const Female = styled.img`
  position: absolute;
  bottom: 0;
  right: 25%;
  height: 80%;
  width: 30%;
  object-fit: cover;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Male = styled.img`
  position: absolute;
  bottom: 0;
  right: 2rem;
  height: 90%;
  width: 30%;
  object-fit: cover;
  @media (max-width: 800px) {
    display: none;
  }
`;

const LoginForm = styled.form`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ModuWorld = styled.img`
  width: 100%;
`;

const Email = styled(Input)`
  width: 50%;
  margin-top: 4rem;
  @media (max-width: 800px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const Password = styled(Input)`
  width: 50%;
  margin-top: 2rem;
  @media (max-width: 800px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

const Submit = styled(Button)`
  margin-top: 2rem;
`;

const Error = styled.p<{ error: boolean }>`
  width: 50%;
  margin-top: 1rem;
  color: ${red};
  opacity: ${({ error }) => (error ? 1 : 0)};
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Login: FC<RouteComponentProps> = ({ history }) => {
  const { login } = useContext(UserContext);

  const [error, setError] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
    username: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({ [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const { username, password } = loginInput;
    try {
      await Auth.signIn(username, password);
      await login();
      history.push('/posts');
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <LoginView>
      <Male src={male} />
      <Female src={female} />

      <LoginForm onSubmit={handleSubmit}>
        <ModuWorld src={require('assets/modu_world.png')} />
        <Email type="text" placeholder="USERNAME" name="username" onChange={handleInput} value={loginInput.username} />
        <Password
          type="password"
          placeholder="PASSWORD"
          name="password"
          onChange={handleInput}
          value={loginInput.password}
        />
        <Submit type="submit" color="white" isLoading={isLoading}>
          LOGIN
        </Submit>
        <Error error={error}>Incorrect username or password.</Error>
      </LoginForm>
    </LoginView>
  );
};

export { Login };

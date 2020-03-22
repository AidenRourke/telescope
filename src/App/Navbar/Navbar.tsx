import React, { FC } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

import { Button } from 'Components/Button';
import { green, white } from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 15%;
  padding: 2rem;
`;

const Modu = styled.img`
  width: 100%;
`;

const Links = styled.div`
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  display: block;
  margin-bottom: 1rem;
  color: ${({ isActive }) => (isActive ? green : white)};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  text-decoration: none;
  &:last-of-type {
    margin-bottom: 0;
  }
  &:hover {
    opacity: 1;
    color: ${green};
    text-decoration: underline;
  }
`;

const WidgetContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const links = [
  { to: '/worlds', name: 'WORLDS' },
  { to: '/posts', name: 'USER POSTS' },
  { to: '/analytics', name: 'ANALYTICS' },
  { to: '/worlds', name: 'SERVERS' },
];

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Navbar: FC<Props> = ({ history, location, children, setIsAuthenticated }) => {
  const handleLogout = async (e: any) => {
    e.preventDefault();

    await Auth.signOut();
    setIsAuthenticated(false);
    history.push('/login');
  };

  return (
    <NavContainer>
      <Modu src={sidebar} />
      <WidgetContainer>{children}</WidgetContainer>
      <Links>
        {links.map(({ to, name }) => (
          <StyledLink key={name} to={to} isActive={location.pathname.includes(to)}>
            <h3>{name}</h3>
          </StyledLink>
        ))}
      </Links>
      <Button isOutlined={true} size="small" color="green" onClick={handleLogout}>
        LOGOUT
      </Button>
    </NavContainer>
  );
};

export { Navbar };

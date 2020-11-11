import React, { FC, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

import { Button } from 'Components/Button';
import { green, white } from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';
import { UserContext } from '../../Contexts/UserContext';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 12rem;
  padding: 2rem;
`;

const Modu = styled.img`
  width: 12rem;
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
  overflow: scroll;
`;

const adminLinks = [
  { pathname: '/worlds', name: 'WORLDS' },
  { pathname: '/posts', name: 'USER POSTS' },
  { pathname: '/admin', name: 'ADMIN' },
];

const links = [
  { pathname: '/worlds', name: 'WORLDS' },
  { pathname: '/posts', name: 'USER POSTS' },
];

const Navbar: FC<RouteComponentProps> = ({ history, location, children }) => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = async (e: any) => {
    e.preventDefault();

    await Auth.signOut();
    logout();
    history.push('/login');
  };

  const validLinks = user.isAdmin ? adminLinks : links;

  return (
    <NavContainer>
      <Modu src={sidebar} />
      <WidgetContainer>{children}</WidgetContainer>
      <Links>
        {validLinks.map(({ pathname, name }) => (
          <StyledLink
            key={name}
            to={{ pathname, search: location.search }}
            isActive={location.pathname.includes(pathname)}
          >
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

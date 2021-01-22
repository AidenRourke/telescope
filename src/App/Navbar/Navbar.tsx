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
  padding: 2rem;
  flex-direction: column;
`;

const Modu = styled.img`
  width: 10rem;
`;

const Links = styled.div`
  justify-content: flex-end;
  flex: 1;
  margin: 2rem 0;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  font-size: 0.75rem;
  display: block;
  margin: 0.5rem 0;
  color: ${({ isActive }) => (isActive ? green : white)};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  text-decoration: none;
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
  { pathname: '/posts', name: 'POSTS' },
  { pathname: '/worlds', name: 'WORLDS' },
  { pathname: '/admin', name: 'ADMIN' },
];

const links = [
  { pathname: '/posts', name: 'POSTS' },
  { pathname: '/worlds', name: 'WORLDS' },
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
      {children}
      <Button isOutlined={true} size="small" color="green" onClick={handleLogout}>
        LOGOUT
      </Button>
    </NavContainer>
  );
};

export { Navbar };

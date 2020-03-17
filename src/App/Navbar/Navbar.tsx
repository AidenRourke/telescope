import React, { FC } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'Components/Button';
import { green, white } from 'styles/colors';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 4rem 4rem 2rem 4rem;
  h1 {
    text-align: center;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  justify-content: center;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
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
`;

const links = [
  { to: '/worlds', name: 'WORLDS' },
  { to: '/posts', name: 'USER POSTS' },
  { to: '/analytics', name: 'ANALYTICS' },
  { to: '/worlds', name: 'SERVERS' },
];

const Navbar: FC<RouteComponentProps> = ({ history, location, children }) => {
  return (
    <NavContainer>
      <h1>MODU</h1>
      <WidgetContainer>{children}</WidgetContainer>
      <Links>
        {links.map(({ to, name }) => (
          <StyledLink to={to} isActive={location.pathname.includes(to)}>
            <h3>{name}</h3>
          </StyledLink>
        ))}
      </Links>
      <Button isOutlined={true} color="green" onClick={() => history.push('/login')}>
        LOGOUT
      </Button>
    </NavContainer>
  );
};

export { Navbar };

import React, { FC } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'Components/Button';
import { green, white } from 'styles/colors';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 3rem;
  h1 {
    margin: 0;
    text-align: center;
  }
`;

const Links = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ isActive }) => (isActive ? green : white)};
  opacity: ${({ isActive }) => (isActive ? '1' : '.3')};
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
  flex: 2;
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

const Navbar: FC<RouteComponentProps> = ({ history, location, children }) => {
  return (
    <NavContainer>
      <WidgetContainer>{children}</WidgetContainer>
      <Links>
        {links.map(({ to, name }) => (
          <StyledLink to={to} isActive={location.pathname.includes(to)}>
            {name}
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

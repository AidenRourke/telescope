import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from 'App/Navbar';
import { UserPostsData } from './UserPostsData';
import { ListView } from './ListView';
// import { GlobeView } from './GlobeView';

const UserPostsContainer = styled.div`
  padding: 2rem 2rem 2rem 3rem;
  min-width: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const UserPosts: FC<Props> = props => {
  return (
    <>
      <Navbar {...props}>
        <UserPostsData />
      </Navbar>
      <UserPostsContainer>
        <ListView label="LIST VIEW" />
      </UserPostsContainer>
    </>
  );
};

export { UserPosts };

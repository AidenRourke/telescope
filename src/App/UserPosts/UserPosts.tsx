import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from 'App/Navbar';
import { UserPostsData } from './UserPostsData';
import { UserPostsheader } from './UserPostsheader';

const UserPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WithNavbarContainer = styled.div`
  display: flex;
  flex: 1;
`;

const UserPosts: FC<RouteComponentProps> = props => {
  return (
    <UserPostsContainer>
      <UserPostsheader />
      <WithNavbarContainer>
        <Navbar {...props}>
          <UserPostsData />
        </Navbar>
      </WithNavbarContainer>
    </UserPostsContainer>
  );
};

export { UserPosts };

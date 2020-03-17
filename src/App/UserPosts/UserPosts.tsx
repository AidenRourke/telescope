import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from 'App/Navbar';
import { UserPostsData } from './UserPostsData';
import { UserPostsContent } from './UserPostsContent';

const WithNavbarContainer = styled.div`
  display: flex;
  width: 100%;
`;

const UserPosts: FC<RouteComponentProps> = props => {
  return (
    <WithNavbarContainer>
      <Navbar {...props}>
        <UserPostsData />
      </Navbar>
      <UserPostsContent />
    </WithNavbarContainer>
  );
};

export { UserPosts };

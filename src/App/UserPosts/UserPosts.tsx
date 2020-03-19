import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from 'App/Navbar';
import { UserPostsData } from './UserPostsData';
import { Tabs } from '../../Components/Tabs';
import { ListView } from './ListView';
import { GlobeView } from './GlobeView';

const WithNavbarContainer = styled.div`
  display: flex;
  width: 100%;
`;

const UserPostsContainer = styled.div`
  padding: 2rem 4rem;
  flex: 1;
`;

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const UserPosts: FC<Props> = props => {
  return (
    <WithNavbarContainer>
      <Navbar {...props}>
        <UserPostsData />
      </Navbar>
      <UserPostsContainer>
        <Tabs>
          <ListView label="LIST VIEW" />
          <GlobeView label="GLOBE VIEW" />
        </Tabs>
      </UserPostsContainer>
    </WithNavbarContainer>
  );
};

export { UserPosts };

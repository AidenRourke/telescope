import React, { FC } from 'react';
import styled from 'styled-components';
import { Tabs } from 'Components/Tabs';
import { ListView } from './ListView';

const UserPostsContainer = styled.div`
  padding: 4rem;
  flex: 1;
`;

const UserPostsContent: FC = () => {
  return (
    <UserPostsContainer>
      <Tabs>
        <ListView label="GLOBE VIEW">WELCOME TO GLOBE VIEW</ListView>
        <ListView label="LIST VIEW">WELCOME TO LIST VIEW</ListView>
      </Tabs>
    </UserPostsContainer>
  );
};

export { UserPostsContent };

import React, {FC, useState} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar } from 'App/Navbar';
import { UserPostsData } from './UserPostsData';
import { ListView } from './ListView';
import { FilterSearch, Filters } from 'Components/';
// import { GlobeView } from './GlobeView';

const UserPostsContainer = styled.div`
  padding: 1rem 2rem 2rem 2rem;
  min-width: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const UserPosts: FC<RouteComponentProps> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Navbar {...props}/>
      <UserPostsContainer>
        <FilterSearch
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={['USER', 'LOCATION', 'TAG']}
        />
        <Filters/>
        <ListView label="LIST VIEW" />
      </UserPostsContainer>
    </>
  );
};

export { UserPosts };

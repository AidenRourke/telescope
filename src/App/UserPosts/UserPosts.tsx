import React, {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import styled from 'styled-components';

import {Navbar} from 'App/Navbar';
import {UserPostsData} from './UserPostsData';
import {ListView} from './ListView';
// import {GlobeView} from './GlobeView';
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

const WithNavbarContainer = styled.div`
  display: flex;
  width: 100%;
`;

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

const POSTS = gql`
  {
    post(id: "1") {
      title
      description
    }
  }
`;

const UserPosts: FC<Props> = props => {

  const { loading, error, data } = useQuery(POSTS);

  console.log(data)


  return (
    <WithNavbarContainer>
      <Navbar {...props}>{<UserPostsData/>}</Navbar>
      <UserPostsContainer>
        <ListView label="LIST VIEW"/>
      </UserPostsContainer>
    </WithNavbarContainer>
  );
};

export {UserPosts};

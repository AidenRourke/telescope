import React, {FC} from "react"
import {RouteComponentProps} from "react-router";
import {Navbar} from "../Navbar";
import {UserPostsData} from "../UserPosts/UserPostsData";
import styled from "styled-components";
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AdminContainer = styled.div`
  padding: 2rem 2rem 2rem 3rem;
  min-width: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const GET_WORLDS = gql`
  {
    worlds {
      title
      description
      createdAt
    }
  }
`;

const Admin: FC<Props> = (props) => {
  const { loading, data } = useQuery(GET_WORLDS);

  console.log(data);

  return <>
    <Navbar {...props}>{<UserPostsData/>}</Navbar>
    <AdminContainer>
      <div>Worlds</div>
      {!loading && data.worlds.map((world:any) => <p>{world.title}</p>)}
      <div>Publishers</div>
      <div>Users</div>
    </AdminContainer>
  </>

}

export {Admin}
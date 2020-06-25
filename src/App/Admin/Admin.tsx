import React, {FC, useState} from "react"
import {RouteComponentProps} from "react-router";
import {Navbar} from "../Navbar";
import {UserPostsData} from "../UserPosts/UserPostsData";
import styled from "styled-components";
import {gql} from 'apollo-boost';
import {useQuery, useMutation} from "@apollo/react-hooks";

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AdminContainer = styled.div`
  padding: 2rem 2rem 2rem 3rem;
  min-width: 0px;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
`;

const GET_WORLDS = gql`
  {
    publishers {
      id
      name
    }
  }
`;

const ATTACH_USER = gql`
  mutation CreateAccount($publisherId: ID!) {
    createAccount(publisherId: $publisherId) {
      errors
    }
  }
`;

const WORLDS = "worlds";
const PUBLISHERS = "publishers";

const Admin: FC<Props> = (props) => {
  const [selection, setSelection] = useState<String>(WORLDS);

  const {loading, data} = useQuery(GET_WORLDS);
  const [attachUser] = useMutation(ATTACH_USER);

  return <>
    <Navbar {...props}>{<UserPostsData/>}</Navbar>
    <AdminContainer>
      <div>
        <h1>Publishers</h1>
        {data?.publishers.map((publisher: any) => <p
          onClick={() => attachUser({variables: {publisherId: publisher.id}})}>{publisher.name}</p>)}
      </div>
    </AdminContainer>
  </>

}

export {Admin}
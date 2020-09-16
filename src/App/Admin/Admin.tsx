import React, {FC, useState} from "react"
import {RouteComponentProps} from "react-router";
import {Navbar} from "../Navbar";
import {UserPostsData} from "../UserPosts/UserPostsData";
import styled from "styled-components";
import {gql} from 'apollo-boost';
import {useMutation} from "@apollo/react-hooks";

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

const ATTACH_USER = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      post {
        tags {
          name
        }
      }
    }
  }
`;

const WORLDS = "worlds";
const PUBLISHERS = "publishers";

const Admin: FC<Props> = (props) => {
  const [selection, setSelection] = useState<String>(WORLDS);

  const [attachUser, {data}] = useMutation(ATTACH_USER);

  console.log(data);

  return <>
    <Navbar {...props}>{<UserPostsData/>}</Navbar>
    <AdminContainer>
      <button onClick={() => attachUser({
        variables: {
          input: {
            // lattitude: 45.399913, longitude: 45.399913,
            submittedBy: "9e1c56f6-b9f1-4401-91e5-37ecb7778464", title: "Real Shit", tags: ["Tag_1", "tag_2"]
          }
        }
      })}>Click Me
      </button>
    </AdminContainer>
  </>

}

export {Admin}
import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar';
import { UserPostsData } from '../UserPosts/UserPostsData';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

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
      errors
    }
  }
`;

const CREATE_WORLD = gql`
  mutation CreateWorld($input: CreateWorldInput!) {
    createWorld(input: $input) {
      world {
        id
      }
    }
  }
`;

const Admin: FC<Props> = props => {
  const [attachUser] = useMutation(ATTACH_USER);
  const [createWorld] = useMutation(CREATE_WORLD);
  return (
    <>
      <Navbar {...props}>{<UserPostsData />}</Navbar>
      <AdminContainer>
        <button
          onClick={() =>
            createWorld({
              variables: {
                input: {
                  publisherNames: ['MODU'], // Hard coded for now
                  title: 'Current Joys'
                },
              },
            })
          }
        >
          Create World
        </button>

        <button
          onClick={() =>
            attachUser({
              variables: {
                input: {
                  frame1S3: 'https://orion-storage-us-east.s3.amazonaws.com/BF6E89EE-BD11-4D2A-B9A0-03578F4B2FE6.png',
                  frame2S3: 'https://orion-storage-us-east.s3.amazonaws.com/8D92FADA-436B-461B-901E-FD8E8A893F47.png',
                  frame3S3: 'https://orion-storage-us-east.s3.amazonaws.com/C385FBD3-9852-42EE-9DC5-5D7E54235BFD.png',
                  frame4S3: 'https://orion-storage-us-east.s3.amazonaws.com/21E461EA-9711-401C-AD52-22D8228DD559.png',
                  nsfwFlag: false,
                  phaseOfCapture: 'Day',
                  reported: false,
                  description: 'Where did she come from, where did she go?',
                  submittedBy: '9e1c56f6-b9f1-4401-91e5-37ecb7778464',
                  title: 'Mystery Image',
                  tags: [],
                },
              },
            })
          }
        >
          Create Post
        </button>
      </AdminContainer>
    </>
  );
};

export { Admin };

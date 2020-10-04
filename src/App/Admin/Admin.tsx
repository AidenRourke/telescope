import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar';
import { UserPostsData } from '../UserPosts/UserPostsData';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import * as colors from 'styles/colors';
import { Modal } from 'Components/Modal';
import { AdminOptionModal } from './AdminOptionModal';

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

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AdminContainer = styled.div`
  padding: 2rem 2rem 2rem 3rem;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const AdminOptions = styled.div`
  margin: 2rem 0;
  width: 100%;
  flex: 1;
`;

const AdminOption = styled.button<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  font: inherit;
  color: ${colors.white};
  text-align: left;
  border: none;
  background-color: ${({ selected }) => (selected ? colors.green : 'transparent')};
`;

const OptionDetails = styled.div`
  text-align: center;
  width: 100%;
  border: 3px solid ${colors.green};
  color: ${colors.green};
  padding: 2rem 0;
`;

const ADD_USER = gql`
  mutation AddUser($preferredUsername: String!, $admin: Boolean!) {
    addUser(preferredUsername: $preferredUsername, admin: $admin) {
      user {
        id
      }
    }
  }
`;

const ADD_PUBLISHER = gql`
  mutation AddPublisher($publisherName: String!, $organizationFlag: Boolean!) {
    addPublisher(publisherName: $publisherName, organizationFlag: $organizationFlag) {
      publisher {
        id
      }
    }
  }
`;

const ADD_ACCOUNT = gql`
  mutation AddAccount($publisherName: String!, $preferredUsername: String!) {
    addAccount(publisherName: $publisherName, preferredUsername: $preferredUsername) {
      account {
        id
      }
    }
  }
`;

const Admin: FC<Props> = props => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [attachUser] = useMutation(ATTACH_USER);
  const [addUser, { loading: isAddingUser }] = useMutation(ADD_USER, { errorPolicy: 'all' });
  const [addPublisher, { loading: isAddingPublisher }] = useMutation(ADD_PUBLISHER, { errorPolicy: 'all' });
  const [addAccount, { loading: isAddingAccount }] = useMutation(ADD_ACCOUNT, { errorPolicy: 'all' });

  const handleAddUser = async (e: any) => {
    await addUser({
      variables: {
        preferredUsername: e.target.preferredUsername.value,
        admin: e.target.isAdmin.checked,
      },
    });
    e.target.reset();
  };

  const handleAddPublisher = async (e: any) => {
    await addPublisher({
      variables: {
        publisherName: e.target.publisherName.value,
        organizationFlag: e.target.isOrganization.checked,
      },
    });
  };

  const handleAddAccount = async (e: any) => {
    await addAccount({
      variables: {
        publisherName: e.target.publisherName.value,
        preferredUsername: e.target.preferredUsername.value,
      },
    });
  };

  const renderHelpers = () => (
    <>
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
    </>
  );

  const ADMIN_OPTIONS = [
    {
      name: 'ADD USERS',
      description: 'CREATE USERS',
      fields: [
        { name: 'preferredUsername', type: 'text', display: 'USER NAME' },
        { name: 'isAdmin', type: 'checkbox', display: 'ADMIN?' },
      ],
      mutation: handleAddUser,
    },
    {
      name: 'ADD PUBLISHERS',
      description: 'CREATE PUBLISHERS',
      fields: [
        { name: 'publisherName', type: 'text', display: 'PUBLISHER NAME' },
        { name: 'isOrganization', type: 'checkbox', display: 'ORGANIZATION?' },
      ],
      mutation: handleAddPublisher,
    },
    {
      name: 'ADD ACCOUNTS',
      description: 'CREATE ACCOUNTS',
      fields: [
        { name: 'preferredUsername', type: 'text', display: 'USER NAME' },
        { name: 'publisherName', type: 'text', display: 'PUBLISHER NAME' },
      ],
      mutation: handleAddAccount,
    },
  ];

  return (
    <>
      <Navbar {...props}>{<UserPostsData />}</Navbar>
      <AdminContainer>
        <h1>SETTINGS AND OPTIONS</h1>
        <AdminOptions>
          {ADMIN_OPTIONS.map((option, i) => (
            <AdminOption
              onMouseOver={() => setSelectedOption(i)}
              selected={selectedOption === i}
              onClick={() => setIsOpen(true)}
            >
              {option.name}
            </AdminOption>
          ))}
        </AdminOptions>
        <OptionDetails>{ADMIN_OPTIONS[selectedOption].description}</OptionDetails>
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
          <AdminOptionModal
            adminOption={ADMIN_OPTIONS[selectedOption]}
            loading={isAddingUser || isAddingPublisher}
          />
        </Modal>
      </AdminContainer>
    </>
  );
};

export { Admin };

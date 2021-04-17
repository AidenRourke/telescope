import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Loading, Button, Input } from 'Components';
import { UserType } from 'Types/types';
import { UserRow } from './UserRow';
import { red } from 'styles/colors';

const Table = styled.table`
  width: 100%;
  th,
  td {
    text-align: left;
    padding: 0.25rem 1rem;
  }
`;

const Error = styled.p<{ error: boolean }>`
  margin: 0.25rem 1rem;
  color: ${red};
  height: ${({ error }) => (error ? 'auto' : 0)};
  overflow: hidden;
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      isAdmin
      preferredUsername
      cognitoId
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($preferredUsername: String!, $admin: Boolean!) {
    createUser(preferredUsername: $preferredUsername, admin: $admin) {
      user {
        id
        isAdmin
        preferredUsername
      }
      errors
    }
  }
`;

const UsersModalContent: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: ['GetUsers'],
    awaitRefetchQueries: true,
  });

  const { data } = useQuery(GET_USERS);

  const handleCreateUser = async () => {
    const result = await createUser({
      variables: {
        preferredUsername: username,
        admin: isAdmin,
      },
    });
    setIsAdmin(false);
    setUsername('');
    if (result.data.createUser.errors) {
      setError(result.data.createUser.errors[0])
    } else
      setError('')
    if (result.data.createUser.errors) {
      setError(result.data.createUser.errors[0])
    } else
      setError('')
  };

  const renderUsers = () => {
    if (data) {
      return data.users.map((user: UserType) => <UserRow key={user.id} user={user} />);
    }
  };

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>USER NAME</th>
            <th>ADMIN?</th>
            <th>OPTION</th>
          </tr>
          {renderUsers()}
          <tr>
            <td>
              <Input
                color="blue"
                inputSize="small"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </td>
            <td>
              <input
                color="blue"
                type="checkbox"
                checked={isAdmin}
                onChange={(e: any) => setIsAdmin(e.target.checked)}
              />
            </td>
            <td>
              {loading ? (
                <Loading>ADDING</Loading>
              ) : (
                <Button color="blue" isOutlined={true} size="small" onClick={handleCreateUser}>
                  ADD
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      <Error error={error !== ''}>{error}</Error>
    </>
  );
};

export { UsersModalContent };

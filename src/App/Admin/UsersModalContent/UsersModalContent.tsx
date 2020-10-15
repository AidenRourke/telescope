import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Loading, Button, Input } from 'Components';
import { UserType } from 'Types/types';
import { UserRow } from './UserRow';

const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
    padding: 0.5rem;
  }
  td {
    padding: 0.5rem;
  }
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
    }
  }
`;

const UsersModalContent: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    errorPolicy: 'all',
    refetchQueries: ['GetUsers'],
    awaitRefetchQueries: true,
  });

  const { data } = useQuery(GET_USERS);

  const handleCreateUser = async () => {
    await createUser({
      variables: {
        preferredUsername: username,
        admin: isAdmin,
      },
    });
    setIsAdmin(false);
    setUsername('');
  };

  const renderUsers = () => {
    if (data) {
      return data.users.map((user: UserType) => <UserRow key={user.id} user={user} />);
    }
  };

  return (
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
            <Input color="blue" inputSize="small" value={username} onChange={(e: any) => setUsername(e.target.value)} />
          </td>
          <td>
            <input color="blue" type="checkbox" checked={isAdmin} onChange={(e: any) => setIsAdmin(e.target.checked)} />
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
  );
};

export { UsersModalContent };

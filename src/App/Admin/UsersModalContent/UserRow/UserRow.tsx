import React, { FC } from 'react';
import { Button, Loading } from 'Components';
import { UserType } from 'Types/types';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface Props {
  user: UserType;
}

const REMOVE_USER = gql`
  mutation RemoveUser($userId: ID!) {
    removeUser(userId: $userId) {
      user {
        id
      }
    }
  }
`;

const UserRow: FC<Props> = ({ user }) => {
  const [removeUser, { loading }] = useMutation(REMOVE_USER, {
    refetchQueries: ['GetUsers'],
    awaitRefetchQueries: true,
  });

  const handleRemoveUser = async () => {
    await removeUser({
      variables: {
        userId: user.id,
      },
    });
  };

  return (
    <tr>
      <td>{user.preferredUsername}</td>
      <td>{user.isAdmin?.toString()}</td>
      <td>
        {loading ? (
          <Loading>REMOVING</Loading>
        ) : (
          <Button color="red" isOutlined={true} size="small" onClick={handleRemoveUser}>
            REMOVE
          </Button>
        )}
      </td>
    </tr>
  );
};

export { UserRow };

import React, { FC, useContext } from 'react';
import { Button, Loading } from 'Components';
import { UserType } from 'Types/types';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { UserContext } from 'Contexts/UserContext';

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
  const { user: currentUser } = useContext(UserContext);

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

  const renderRemoveOption = () => {
    if (loading) {
      return <Loading>REMOVING</Loading>;
    }
    return (
      <Button
        disabled={user.cognitoId === currentUser.id}
        color="red"
        isOutlined={true}
        size="small"
        onClick={handleRemoveUser}
      >
        REMOVE
      </Button>
    );
  };

  return (
    <tr>
      <td>{user.preferredUsername}</td>
      <td>{user.isAdmin?.toString()}</td>
      <td>{renderRemoveOption()}</td>
    </tr>
  );
};

export { UserRow };

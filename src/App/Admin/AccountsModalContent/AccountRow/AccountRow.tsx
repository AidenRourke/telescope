import React, { FC } from 'react';
import { Button, Loading } from 'Components';
import { AccountType } from 'Types/types';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface Props {
  account: AccountType;
}

const REMOVE_ACCOUNT = gql`
  mutation RemoveAccount($accountId: ID!) {
    removeAccount(accountId: $accountId) {
      account {
        id
      }
    }
  }
`;

const AccountRow: FC<Props> = ({ account }) => {
  const [removeAccount, { loading }] = useMutation(REMOVE_ACCOUNT, {
    refetchQueries: ['GetAccounts'],
    awaitRefetchQueries: true,
  });

  const handleRemoveAccount = async () => {
    await removeAccount({
      variables: {
        accountId: account.id,
      },
    });
  };

  return (
    <tr>
      <td>{account.user?.preferredUsername}</td>
      <td>{account.publisher?.name}</td>
      <td>
        <Button isLoading={loading} color="red" isOutlined={true} size="small" onClick={handleRemoveAccount}>
          REMOVE
        </Button>
      </td>
    </tr>
  );
};

export { AccountRow };

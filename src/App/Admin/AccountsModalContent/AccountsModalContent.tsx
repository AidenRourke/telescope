import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Loading, Input, Button } from 'Components';
import { AccountType } from 'Types/types';
import { AccountRow } from './AccountRow';
import { red } from 'styles/colors';

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

const Error = styled.p<{ error: boolean }>`
  margin: 0.25rem 1rem;
  color: ${red};
  height: ${({ error }) => (error ? 'auto' : 0)};
  overflow: hidden;
`;

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      publisher {
        id
        name
      }
      user {
        id
        preferredUsername
      }
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($publisherName: String!, $preferredUsername: String!) {
    createAccount(publisherName: $publisherName, preferredUsername: $preferredUsername) {
      account {
        id
      }
      errors
    }
  }
`;

const AccountsModalContent: FC = () => {
  const [publisherName, setPublisherName] = useState('');
  const [preferredUsername, setPreferredUsername] = useState('');
  const [error, setError] = useState<string>('');

  const { data } = useQuery(GET_ACCOUNTS);

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: ['GetAccounts'],
    awaitRefetchQueries: true,
  });

  const handleCreateAccount = async () => {
    const result = await createAccount({
      variables: {
        publisherName,
        preferredUsername,
      },
    });
    setPublisherName('');
    setPreferredUsername('');
    if (result.data.createAccount.errors) {
      setError(result.data.createAccount.errors[0]);
    } else setError('');
  };

  const renderAccounts = () => {
    if (data) {
      return data.accounts.map((account: AccountType) => <AccountRow key={account.id} account={account} />);
    }
  };
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>USER NAME</th>
            <th>PUBLISHER NAME</th>
            <th>OPTION</th>
          </tr>
          {renderAccounts()}
          <tr>
            <td>
              <Input
                color="blue"
                inputSize="small"
                value={preferredUsername}
                onChange={(e: any) => setPreferredUsername(e.target.value)}
              />
            </td>
            <td>
              <Input
                color="blue"
                inputSize="small"
                value={publisherName}
                onChange={(e: any) => setPublisherName(e.target.value)}
              />
            </td>
            <td>
              <Button isLoading={loading} color="blue" isOutlined={true} size="small" onClick={handleCreateAccount}>
                ADD
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Error error={error !== ''}>{error}</Error>
    </>
  );
};

export { AccountsModalContent };

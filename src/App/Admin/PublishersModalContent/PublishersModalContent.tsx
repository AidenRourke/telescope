import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Loading, Button, Input } from 'Components';
import { PublisherType } from 'Types/types';
import { AdminPublisherRow } from './AdminPublisherRow';
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

const GET_PUBLISHERS = gql`
  query GetPublishers {
    publishers {
      id
      name
      organizationFlag
    }
  }
`;

const CREATE_PUBLISHER = gql`
  mutation CreatePublisher($publisherName: String!, $organizationFlag: Boolean!) {
    createPublisher(publisherName: $publisherName, organizationFlag: $organizationFlag) {
      publisher {
        id
      }
      errors
    }
  }
`;

const PublishersModalContent: FC = () => {
  const [organizationFlag, setOrganizationFlag] = useState<boolean>(false);
  const [publisherName, setPublisherName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { data, loading } = useQuery(GET_PUBLISHERS);

  const [createPublisher, { loading: creatingPublisher }] = useMutation(CREATE_PUBLISHER, {
    refetchQueries: ['GetPublishers'],
    awaitRefetchQueries: true,
  });

  const handleCreatePublisher = async () => {
    const result = await createPublisher({
      variables: {
        publisherName,
        organizationFlag,
      },
    });
    setOrganizationFlag(false);
    setPublisherName('');
    if (result.data.createPublisher.errors) {
      setError(result.data.createPublisher.errors[0]);
    } else setError('');
  };

  const renderPublishers = () => {
    if (!loading) {
      return data.publishers.map((publisher: PublisherType) => (
        <AdminPublisherRow key={publisher.id} publisher={publisher} />
      ));
    }
  };

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>PUBLISHER NAME</th>
            <th>ORGANIZATION?</th>
            <th>OPTION</th>
          </tr>
          {renderPublishers()}
          <tr>
            <td>
              <Input
                color="blue"
                inputSize="small"
                value={publisherName}
                onChange={(e: any) => setPublisherName(e.target.value)}
              />
            </td>
            <td>
              <input
                color="blue"
                type="checkbox"
                checked={organizationFlag}
                onChange={(e: any) => setOrganizationFlag(e.target.checked)}
              />
            </td>
            <td>
              <Button
                isLoading={creatingPublisher}
                color="blue"
                isOutlined={true}
                size="small"
                onClick={handleCreatePublisher}
              >
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

export { PublishersModalContent };

import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Loading, Button, Input } from 'Components';
import { PublisherType } from 'Types/types';
import { PublisherRow } from './PublisherRow';

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
    }
  }
`;

const PublishersModalContent: FC = () => {
  const [organizationFlag, setOrganizationFlag] = useState<boolean>(false);
  const [publisherName, setPublisherName] = useState<string>('');

  const { data, loading } = useQuery(GET_PUBLISHERS);

  const [createPublisher, { loading: creatingPublisher }] = useMutation(CREATE_PUBLISHER, {
    errorPolicy: 'all',
    refetchQueries: ['GetPublishers'],
    awaitRefetchQueries: true,
  });

  const handleCreatePublisher = async () => {
    await createPublisher({
      variables: {
        publisherName,
        organizationFlag,
      },
    });
    setOrganizationFlag(false);
    setPublisherName('');
  };

  const renderPublishers = () => {
    if (!loading) {
      return data.publishers.map((publisher: PublisherType) => (
        <PublisherRow key={publisher.id} publisher={publisher} />
      ));
    }
  };

  return (
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
            {creatingPublisher ? (
              <Loading>ADDING</Loading>
            ) : (
              <Button color="blue" isOutlined={true} size="small" onClick={handleCreatePublisher}>
                ADD
              </Button>
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export { PublishersModalContent };

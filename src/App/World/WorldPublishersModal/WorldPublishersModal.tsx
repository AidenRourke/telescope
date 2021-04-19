import React, { FC, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { PublisherType, WorldType } from 'Types/types';
import { WorldPublisherRow } from './WorldPublisherRow';
import { UserContext } from 'Contexts/UserContext';

const GET_PUBLISHERS = gql`
  query GetPublishers {
    publishers {
      id
      name
      worlds {
        id
      }
    }
  }
`;

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

interface Props {
  world: WorldType;
}

const WorldPublishersModal: FC<Props> = ({ world }) => {
  const {
    user: { isAdmin },
  } = useContext(UserContext);

  const { data, loading } = useQuery(GET_PUBLISHERS);

  const renderPublishers = () => {
    if (!loading) {
      if (isAdmin) {
        return data.publishers.map((publisher: PublisherType) => (
          <WorldPublisherRow key={publisher.id} publisher={publisher} worldId={world.id} />
        ));
      }
      return data.publishers?.map((publisher: PublisherType) => (
        <WorldPublisherRow key={publisher.id} publisher={publisher} />
      ));
    }
  };

  return (
    <Table>
      <tbody>
        <tr>
          <th>PUBLISHER NAME</th>
          {isAdmin && <th>OPTION</th>}
        </tr>
        {renderPublishers()}
      </tbody>
    </Table>
  );
};

export { WorldPublishersModal };

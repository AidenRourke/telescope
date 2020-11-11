import React, { FC } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { ModalProps, PublisherType } from 'Types/types';
import { Modal } from '../../../Components/Modal';
import { WorldPublisherRow } from './WorldPublisherRow';

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

interface Props extends ModalProps {
  worldId: string;
}

const AddPublisherModal: FC<Props> = ({ worldId, ...rest }) => {
  const { data, loading } = useQuery(GET_PUBLISHERS);

  const renderPublishers = () => {
    if (!loading) {
      return data.publishers.map((publisher: PublisherType) => (
        <WorldPublisherRow key={publisher.id} publisher={publisher} worldId={worldId} />
      ));
    }
  };

  return (
    <Modal title="PUBLISHERS" {...rest}>
      <Table>
        <tbody>
          <tr>
            <th>PUBLISHER NAME</th>
            <th>OPTION</th>
          </tr>
          {renderPublishers()}
        </tbody>
      </Table>
    </Modal>
  );
};

export { AddPublisherModal };

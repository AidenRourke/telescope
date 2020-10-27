import React, { FC, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { PublisherType } from 'Types/types';

const GET_PUBLISHERS = gql`
  query GetPublishers {
    publishers {
      id
      name
    }
  }
`;

const AddPublisher: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, loading } = useQuery(GET_PUBLISHERS);

  if (loading) return null;

  return (
    <div>

    </div>
  );
};

export { AddPublisher };

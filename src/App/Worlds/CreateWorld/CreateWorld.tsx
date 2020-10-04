import React, { FC } from 'react';
import { gql } from 'apollo-boost';
import { Input, Button } from 'Components';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

const CREATE_WORLD = gql`
  mutation CreateWorld($input: CreateWorldInput!) {
    createWorld(input: $input) {
      world {
        id
      }
    }
  }
`;

const CreateWorldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateWorld: FC = () => {
  const [createWorld] = useMutation(CREATE_WORLD);

  const handleCreateWorld = (e: any) => {
    e.preventDefault();
    createWorld({
      variables: {
        input: { publisherNames: ['MODU'] },
      },
    });
  };

  return (
    <CreateWorldsContainer>
      <h1>CREATE WORLD</h1>
      <form onSubmit={handleCreateWorld}>
        <Input placeholder="PUBLISHER" />
      </form>
    </CreateWorldsContainer>
  );
};

export { CreateWorld };

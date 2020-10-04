import React, { FC } from 'react';
import { gql } from 'apollo-boost';
import { Input } from '../../../Components/Input';

const CREATE_WORLD = gql`
  mutation CreateWorld($input: CreateWorldInput!) {
    createWorld(input: $input) {
      world {
        id
      }
    }
  }
`;

const CreateWorld: FC = () => {
  return (
    <div>
      <h1>CREATE WORLD</h1>
      <Input placeholder="TITLE"/>
      <Input placeholder="PUBLISHER"/>
    </div>
  );
};

export { CreateWorld };

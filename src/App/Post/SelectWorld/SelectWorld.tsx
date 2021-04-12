import React, { FC } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { WorldType } from 'Types/types';
import * as colors from 'styles/colors';
import {Card} from "../Card";

const WorldsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  color: ${colors.blue};
`;

const GET_WORLDS = gql`
  query GetWorlds {
    worlds {
      id
      title
      coverS3
    }
  }
`;

interface Props {
  setSelected: (worldId: string) => void;
}

const SelectWorld: FC<Props> = ({ setSelected }) => {
  const { loading, data } = useQuery(GET_WORLDS);

  const renderWorlds = () => {
    if (loading) return null;
    return data.worlds.map((world: WorldType) => (
      <Card
        key={world.id}
        onClick={setSelected}
        title={world.title}
        imageSrc={world.coverS3}
        id={world.id}
      />
    ));
  };

  return <WorldsContainer>{renderWorlds()}</WorldsContainer>;
};

export { SelectWorld };

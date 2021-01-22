import React, { FC } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { WorldType } from 'Types/types';
import * as colors from 'styles/colors';

const WorldsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  color: ${colors.blue};
`;

const WorldThumbnail = styled.img`
  height: 10rem;
  object-fit: cover;
  border: 3px solid ${colors.blue};
  width: 100%;
  box-sizing: border-box;
`;

const World = styled.div`
  margin: 0.5rem;
  width: 8rem;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity linear 0.15s;
  &:hover {
    opacity: 1;
  }
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
      <World key={world.id} onClick={() => setSelected(world.id)}>
        <WorldThumbnail src={world.coverS3} />
        <p title={world.title}>{world.title}</p>
      </World>
    ));
  };

  return <WorldsContainer>{renderWorlds()}</WorldsContainer>;
};

export { SelectWorld };

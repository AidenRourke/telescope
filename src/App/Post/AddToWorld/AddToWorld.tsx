import React, { FC } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { WorldType } from 'Types/types';
import { AddWorldImage } from './AddWorldImage';
import * as colors from 'styles/colors';

const WorldsContainer = styled.div`
  margin: 2rem 0;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  max-height: 20rem;
  color: ${colors.blue};
`;

const GET_WORLDS = gql`
  query GetWorlds {
    worlds {
      id
      title
      coverS3
      posts {
        id
      }
    }
  }
`;

interface Props {
  postId: string;
}

const AddToWorld: FC<Props> = props => {
  const { loading, data } = useQuery(GET_WORLDS);

  const renderWorlds = () => {
    if (loading) return null;
    return data.worlds.map((world: WorldType) => <AddWorldImage world={world} {...props} />);
  };

  return <WorldsContainer>{renderWorlds()}</WorldsContainer>;
};

export { AddToWorld };

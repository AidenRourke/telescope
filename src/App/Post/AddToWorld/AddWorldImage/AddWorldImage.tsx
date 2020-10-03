import React, { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { WorldType } from 'Types/types';
import { Loading } from 'Components';

import { gql } from 'apollo-boost';

const WorldThumbnail = styled.img`
  width: 8rem;
  height: 10rem;
  object-fit: cover;
  border: 3px solid ${colors.blue};
`;

const World = styled.div`
  margin: 0.5rem;
`;

const WorldEnabled = styled(World)`
  opacity: 0.7;
  cursor: pointer;
  transition: opacity linear 0.15s;
  &:hover {
    opacity: 1;
  }
`;

const WorldDisabled = styled(World)`
  cursor: not-allowed;
  opacity: 1;
`;

const ADD_TO_WORLD = gql`
  mutation AddPostToWorld($postId: ID!, $worldId: ID!) {
    addPostToWorld(postId: $postId, worldId: $worldId) {
      post {
        id
        worlds {
          id
          title
          coverS3
          posts {
            id
          }
        }
      }
    }
  }
`;

interface Props {
  postId: string;
  world: WorldType;
}

const AddWorldImage: FC<Props> = ({ world, postId }) => {
  const [addPostToWorld, { loading: isAddingToWorld }] = useMutation(ADD_TO_WORLD);

  const handleAddToWorld = async (worldId: string) => {
    await addPostToWorld({ variables: { postId, worldId } });
  };

  if (isAddingToWorld || world?.posts?.some(post => post.id === postId)) {
    return (
      <WorldDisabled key={world.id}>
        <WorldThumbnail src={world.coverS3} />
        {!isAddingToWorld ? <p>{world.title}</p> : <Loading>ADDING</Loading>}
      </WorldDisabled>
    );
  }

  return (
    <WorldEnabled key={world.id} onClick={() => handleAddToWorld(world.id)}>
      <WorldThumbnail src={world.coverS3} />
      {!isAddingToWorld ? <p>{world.title}</p> : <Loading>ADDING</Loading>}
    </WorldEnabled>
  );
};

export { AddWorldImage };

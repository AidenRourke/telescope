import React, { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { WorldType } from 'Types/types';
import { Loading } from 'Components';

import { gql } from 'apollo-boost';

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
  p {
    white-space: nowrap;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CREATE_WORLD_POST = gql`
  mutation CreateWorldPost($postId: ID!, $worldId: ID!) {
    createWorldPost(postId: $postId, worldId: $worldId) {
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
  const [createWorldPost, { loading: isCreatingWorldPost }] = useMutation(CREATE_WORLD_POST);

  const handleAddToWorld = async (worldId: string) => {
    await createWorldPost({ variables: { postId, worldId } });
  };

  if (isCreatingWorldPost || world?.posts?.some(post => post.id === postId)) {
    return (
      <WorldDisabled key={world.id}>
        <WorldThumbnail src={world.coverS3} />
        {!isCreatingWorldPost ? <p title={world.title}>{world.title}</p> : <Loading>ADDING</Loading>}
      </WorldDisabled>
    );
  }

  return (
    <WorldEnabled key={world.id} onClick={() => handleAddToWorld(world.id)}>
      <WorldThumbnail src={world.coverS3} />
      {!isCreatingWorldPost ? <p title={world.title}>{world.title}</p> : <Loading>ADDING</Loading>}
    </WorldEnabled>
  );
};

export { AddWorldImage };

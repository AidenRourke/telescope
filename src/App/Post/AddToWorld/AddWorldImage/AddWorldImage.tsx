import React, { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled, { keyframes } from 'styled-components';
import * as colors from 'styles/colors';
import { WorldType } from 'Types/types';

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

const ellipsis = keyframes`
  to {
    width: 1.25rem;  
    margin-right: 0;  
  }
`;

const LoadingDiv = styled.div`
  &::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: '\\2026'; /* ascii code for the ellipsis character */
    width: 0;
    margin-right: 1.25rem;
  }
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
        {!isAddingToWorld ? <p>{world.title}</p> : <LoadingDiv>ADDING</LoadingDiv>}
      </WorldDisabled>
    );
  }

  return (
    <WorldEnabled key={world.id} onClick={() => handleAddToWorld(world.id)}>
      <WorldThumbnail src={world.coverS3} />
      {!isAddingToWorld ? <p>{world.title}</p> : <LoadingDiv>ADDING</LoadingDiv>}
    </WorldEnabled>
  );
};

export { AddWorldImage };

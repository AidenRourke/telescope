import React, { FC } from 'react';
import { PostType } from 'Types/types';
import { WorldPostsListItem } from './WorldPostListItem';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const WorldPostListContainer = styled.div`
  width: 15rem;
`;

const UPDATE_POST_ORDER = gql`
  mutation UpdatePostOrder($worldId: ID!, $postId: ID!, $position: Int!) {
    updatePostOrder(worldId: $worldId, postId: $postId, position: $position) {
      world {
        id
        posts {
          id
        }
      }
    }
  }
`;

interface Props {
  posts: PostType[];
  worldId: string;
}

const WorldPostsList: FC<Props> = ({ posts, worldId }) => {
  const [updatePostOrder] = useMutation(UPDATE_POST_ORDER);

  const movePost = (dragIndex: number, hoverIndex: number) => {
    const dragCard = posts[dragIndex];
    updatePostOrder({
      variables: {
        worldId,
        postId: dragCard.id,
        position: hoverIndex + 1,
      },
    });
  };

  const renderPost = (post: PostType, index: number) => {
    return <WorldPostsListItem post={post} index={index} movePost={movePost} />;
  };

  return <WorldPostListContainer>{posts.map((post, i) => renderPost(post, i))}</WorldPostListContainer>;
};

export { WorldPostsList };

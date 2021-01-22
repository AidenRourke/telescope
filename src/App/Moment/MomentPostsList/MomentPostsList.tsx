import React, { FC, useEffect, useState } from 'react';
import { PostType } from 'Types/types';
import { WorldPostsListItem } from './WorldPostListItem';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import update from 'immutability-helper';

const WorldPostListContainer = styled.div`
  width: 18rem;
  overflow: auto;
`;

const UPDATE_WORLD_POSTS_ORDER = gql`
  mutation UpdateWorldPostsOrder($worldId: ID!, $postId: ID!, $position: Int!) {
    updateWorldPostsOrder(worldId: $worldId, postId: $postId, position: $position) {
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

const MomentPostsList: FC<Props> = ({ posts, worldId }) => {
  const [postsArray, setPostsArray] = useState<PostType[]>(posts);

  useEffect(() => {
    setPostsArray(posts);
  }, [posts]);

  const [updateWorldPostsOrder] = useMutation(UPDATE_WORLD_POSTS_ORDER);

  const movePost = (dragIndex: number, hoverIndex: number) => {
    const dragCard = postsArray[dragIndex];
    setPostsArray(
      update(postsArray, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }),
    );
  };

  const updatePost = (dragIndex: number, dropIndex: number) => {
    const dragCard = postsArray[dragIndex];
    updateWorldPostsOrder({
      variables: {
        worldId,
        postId: dragCard.id,
        position: dropIndex + 1,
      },
    });
  };

  const renderPost = (post: PostType, index: number) => {
    return (
      <WorldPostsListItem
        key={post.id}
        post={post}
        index={index}
        updatePost={updatePost}
        movePost={movePost}
        worldId={worldId}
      />
    );
  };

  return <WorldPostListContainer>{postsArray.map((post, i) => renderPost(post, i))}</WorldPostListContainer>;
};

export { MomentPostsList };

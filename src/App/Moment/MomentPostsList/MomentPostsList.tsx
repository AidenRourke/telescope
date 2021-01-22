import React, { FC, useEffect, useState } from 'react';
import { PostType } from 'Types/types';
import { MomentPostsListItem } from './WorldPostListItem';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import update from 'immutability-helper';

const WorldPostListContainer = styled.div`
  margin-left: 1rem;
  flex: 1;
  overflow: auto;
`;

const UPDATE_MOMENT_POSTS_ORDER = gql`
  mutation UpdateMomentPostsOrder($momentId: ID!, $postId: ID!, $position: Int!) {
    updateMomentPostsOrder(momentId: $momentId, postId: $postId, position: $position) {
      moment {
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
  momentId: string;
}

const MomentPostsList: FC<Props> = ({ posts, momentId }) => {
  const [postsArray, setPostsArray] = useState<PostType[]>(posts);

  useEffect(() => {
    setPostsArray(posts);
  }, [posts]);

  const [updateMomentPostsOrder] = useMutation(UPDATE_MOMENT_POSTS_ORDER);

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
    updateMomentPostsOrder({
      variables: {
        momentId,
        postId: dragCard.id,
        position: dropIndex + 1,
      },
    });
  };

  const renderPost = (post: PostType, index: number) => {
    return (
      <MomentPostsListItem
        key={post.id}
        post={post}
        index={index}
        updatePost={updatePost}
        movePost={movePost}
        momentId={momentId}
      />
    );
  };

  return <WorldPostListContainer>{postsArray.map((post, i) => renderPost(post, i))}</WorldPostListContainer>;
};

export { MomentPostsList };

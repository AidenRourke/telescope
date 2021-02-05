import React, { FC, useEffect, useState } from 'react';
import { MomentPostType } from 'Types/types';
import { MomentPostsListItem } from './WorldPostListItem';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import update from 'immutability-helper';
import * as colors from '../../../styles/colors';
import { useHistory, useLocation } from 'react-router';

const MomentPostListContainer = styled.div`
  margin-left: 1rem;
  flex: 1;
  overflow: auto;
  margin-bottom: 2rem;
`;

const AddPostContainer = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const AddPostInformation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AddPostImage = styled.div`
  width: 3rem;
  height: 5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  svg {
    fill: ${colors.blue};
  }
`;

const UPDATE_MOMENT_POSTS_ORDER = gql`
  mutation UpdateMomentPostsOrder($momentPostId: ID!, $position: Int!) {
    updateMomentPostsOrder(momentPostId: $momentPostId, position: $position) {
      momentPost {
        id
        moment {
          id
          momentPosts {
            id
          }
        }
      }
    }
  }
`;

interface Props {
  momentPosts: MomentPostType[];
  momentId: string;
}

const MomentPostsList: FC<Props> = ({ momentPosts, momentId }) => {
  const [postsArray, setPostsArray] = useState<MomentPostType[]>(momentPosts);

  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    setPostsArray(momentPosts);
  }, [momentPosts]);

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
        momentPostId: dragCard.id,
        position: dropIndex + 1,
      },
    });
  };

  const renderPost = (momentPost: MomentPostType, index: number) => {
    return (
      <MomentPostsListItem
        key={momentPost.id}
        momentPost={momentPost}
        index={index}
        updatePost={updatePost}
        movePost={movePost}
      />
    );
  };

  return (
    <MomentPostListContainer>
      {postsArray.map((post, i) => renderPost(post, i))}
      <AddPostContainer onClick={() => history.push({ pathname: `/posts/`, search })}>
        <AddPostImage>
          <svg xmlns="http://www.w3.org/2000/svg" height="30%" viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </AddPostImage>
        <AddPostInformation>
          <small>ADD POSTS</small>
        </AddPostInformation>
      </AddPostContainer>
    </MomentPostListContainer>
  );
};

export { MomentPostsList };

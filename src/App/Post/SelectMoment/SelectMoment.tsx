import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import * as colors from 'styles/colors';

import { gql } from 'apollo-boost';
import { MomentType } from 'Types/types';
import { Card } from '../Card';

const WorldsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  color: ${colors.blue};
`;

const GET_MOMENTS = gql`
  query GetMoments($id: ID!) {
    moments(id: $id) {
      id
      title
      coverS3
      momentPosts {
        id
        post {
          id
        }
      }
    }
  }
`;

const CREATE_MOMENT_POST = gql`
  mutation CreateMomentPost($postId: ID!, $momentId: ID!) {
    createMomentPost(postId: $postId, momentId: $momentId) {
      momentPost {
        moment {
          id
          momentPosts {
            id
            post {
              id
            }
          }
        }
      }
    }
  }
`;

interface Props {
  postId: string;
  worldId: string;
}

const SelectMoment: FC<Props> = ({ worldId, postId }) => {
  const [createMomentPost, { loading: isCreatingMomentPost }] = useMutation(CREATE_MOMENT_POST);

  const { loading, data } = useQuery(GET_MOMENTS, {
    variables: {
      id: worldId,
    },
  });

  const handleAddToMoment = async (momentId: string) => {
    await createMomentPost({ variables: { postId, momentId } });
  };

  const renderMoments = () => {
    if (loading) return null;
    return data.moments.map((moment: MomentType) => (
      <Card
        onClick={handleAddToMoment}
        title={moment.title}
        imageSrc={moment.coverS3}
        loading={isCreatingMomentPost}
        disabled={moment?.momentPosts?.some(momentPost => momentPost?.post.id === postId)}
        id={moment.id}
      />
    ));
  };

  return <WorldsContainer>{renderMoments()}</WorldsContainer>;
};

export { SelectMoment };

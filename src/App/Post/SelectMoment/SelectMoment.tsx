import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { Loading } from 'Components';

import { gql } from 'apollo-boost';
import { MomentType, WorldType } from '../../../Types/types';

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

const GET_MOMENTS = gql`
  query GetMoments($id: ID!) {
    moments(id: $id) {
      id
      title
      coverS3
      posts {
        id
      }
    }
  }
`;

const CREATE_MOMENT_POST = gql`
  mutation CreateMomentPost($postId: ID!, $momentId: ID!) {
    createMomentPost(postId: $postId, momentId: $momentId) {
      post {
        id
        moments {
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
    return data.moments.map((moment: MomentType) => {
      if (isCreatingMomentPost || moment.posts?.some(post => post.id === postId)) {
        return (
          <WorldDisabled key={moment.id}>
            <WorldThumbnail src={moment.coverS3} />
            {!isCreatingMomentPost ? <p title={moment.title}>{moment.title}</p> : <Loading>ADDING</Loading>}
          </WorldDisabled>
        );
      }
      return (
        <WorldEnabled key={moment.id} onClick={() => handleAddToMoment(moment.id)}>
          <WorldThumbnail src={moment.coverS3} />
          {!isCreatingMomentPost ? <p title={moment.title}>{moment.title}</p> : <Loading>ADDING</Loading>}
        </WorldEnabled>
      );
    });
  };

  return <WorldsContainer>{renderMoments()}</WorldsContainer>;
};

export { SelectMoment };

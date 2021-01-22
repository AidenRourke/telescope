import React, { FC } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { gql } from 'apollo-boost';
import { MomentPostsList } from './MomentPostsList';
import { useQuery } from '@apollo/react-hooks';

const GET_MOMENT = gql`
  query GetMoment($id: ID!) {
    moment(id: $id) {
      id
      title
      coverS3
      posts {
        id
        title
        frame1S3
        position
        user {
          id
          preferredUsername
        }
      }
    }
  }
`;

const Moment: FC<RouteComponentProps> = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOMENT, { variables: { id } });

  if (loading) return null;

  return (
    <div>
      <MomentPostsList posts={data.moment.posts} worldId={data.moment.id} />
    </div>
  );
};

export { Moment };

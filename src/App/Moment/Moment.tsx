import React, { FC } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { gql } from 'apollo-boost';
import { MomentPostsList } from './MomentPostsList';
import { useQuery } from '@apollo/react-hooks';
import { EditableTitle, Dropzone, Button } from 'Components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../Navbar';

const MomentContainer = styled.div`
  margin: 2rem;
  flex: 1;
  display: flex;
`;

const MomentDetails = styled.div`
  margin-right: 1rem;
  flex: 1;
  flex-direction: column;
  display: flex;
`;

const DropZoneImage = styled.div<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
`;

const DropZones = styled.div`
  justify-content: space-between;
  margin-bottom: 2rem;
  flex: 1;
  display: flex;
`;

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

const Moment: FC<RouteComponentProps> = props => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_MOMENT, { variables: { id } });

  if (loading) return null;

  return (
    <>
      <Navbar {...props} />
      <MomentContainer>
        <MomentDetails>
          <EditableTitle title={data.moment.title} onChange={(text: string) => console.log('title')} />
          <DropZones>
            <Dropzone isLoading={false} onDrop={(files: File[]) => console.log('drop')} accept="image/png">
              <DropZoneImage url={data.moment.coverS3} />
            </Dropzone>
          </DropZones>
          <div>
            <Button color="green" size="small">
              ACTIVATE
            </Button>
            <Button color="red" size="small" onClick={() => console.log('blah')}>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" />
            </Button>
          </div>
        </MomentDetails>
        <MomentPostsList posts={data.moment.posts} worldId={data.moment.id} />
      </MomentContainer>
    </>
  );
};

export { Moment };

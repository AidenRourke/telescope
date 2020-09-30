import React, { FC } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PublisherType } from 'Types/types';
import axios from 'axios';

import * as colors from 'styles/colors';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropzone, Button } from 'Components';
import { WorldPostsList } from './WorldPostsList';

const WorldContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 3rem 2rem;
  color: ${colors.blue};
`;

const WorldData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BackArrow = styled(FontAwesomeIcon)`
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const Status = styled.h4`
  span {
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  color: ${colors.green};
`;

const Description = styled.p`
  color: ${colors.green};
  flex: 1;
`;

const WorldInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
  h4 {
    margin: 0;
    opacity: 0.7;
  }
`;

const DropZones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const DropZoneContent = styled.div<{ url: string }>`
  display: flex;
  width: 100%;
  height: 8rem;
  background-image: url(${({ url }) => url});
  background-position: center;
  align-items: center;
  small {
    color: ${colors.white};
    width: 50%;
    margin-left: 1rem;
  }
`;

const CoverImage = styled.img`
  margin: 0 2rem;
  width: 22rem;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
`;

const GET_WORLD = gql`
  query GetWorld($id: ID!) {
    world(id: $id) {
      id
      title
      description
      status
      coverS3
      posts {
        id
        title
        preferredUsername
        frame1S3
        position
      }
      publishers {
        id
        name
        accounts {
          id
        }
      }
    }
  }
`;

const GET_SIGNED_REQUEST = gql`
  mutation SignS3 {
    signS3 {
      signedRequest
      url
    }
  }
`;

const UPDATE_WORLD_IMAGE = gql`
  mutation UpdateWorldImage($worldId: ID!, $imageUrl: String!) {
    updateWorldImage(worldId: $worldId, imageUrl: $imageUrl) {
      world {
        id
        coverS3
      }
    }
  }
`;

const REMOVE_WORLD = gql`
  mutation RemoveWorld($worldId: ID!) {
    removeWorld(worldId: $worldId) {
      world {
        id
      }
    }
  }
`;

const World: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();

  const { loading, data: worldData } = useQuery(GET_WORLD, { variables: { id } });

  const [getSignedRequest] = useMutation(GET_SIGNED_REQUEST);

  const [updateWorldImage] = useMutation(UPDATE_WORLD_IMAGE);

  const [removeWorld] = useMutation(REMOVE_WORLD, { refetchQueries: ['GetWorlds'] });

  const handleRemoveWorld = (worldId: string) => {
    removeWorld({ variables: { worldId } });
    history.push('/worlds');
  };

  const uploadToS3 = async (file: File, signedRequest: string) => {
    const options = {
      headers: {
        'Content-Type': '',
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const onDrop = async (acceptedFiles: File[], isImage: boolean) => {
    const res = await getSignedRequest();
    const {
      data: {
        signS3: { url, signedRequest },
      },
    } = res;
    await uploadToS3(acceptedFiles[0], signedRequest);
    updateWorldImage({ variables: { worldId: worldData.world.id, imageUrl: url } });
  };

  if (loading) return null;

  const { world } = worldData;

  return (
    <WorldContainer>
      <WorldData>
        <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.push('/worlds')} />
        <Status>
          WORLD <span>({world.status.toUpperCase()})</span>
        </Status>
        <Title>{world.title}</Title>
        <Description>{world.description}</Description>
        <WorldInfo>
          <div>
            <h4>CURATORS</h4>
            <h3>{world.publishers.reduce((a: number, c: PublisherType) => a + c?.accounts.length, 0)}</h3>
          </div>
          <div>
            <h4>RELEASE DATE</h4>
            <h3>COMING SOON</h3>
          </div>
          <div>
            <h4>AUTHOR</h4>
            <h3>{world.publishers.map((publisher: PublisherType) => publisher.name).join(', ')}</h3>
          </div>
        </WorldInfo>
        <DropZones>
          <Dropzone onDrop={(files: File[]) => onDrop(files, false)} accept="video/mp4">
            <DropZoneContent url="fake">
              <small>EDIT PRE-ROLL VIDEO</small>
            </DropZoneContent>
          </Dropzone>
          <Dropzone onDrop={(files: File[]) => onDrop(files, true)} accept="image/png">
            <DropZoneContent url={world.coverS3}>
              <small>EDIT COVER IMAGE</small>
            </DropZoneContent>
          </Dropzone>
        </DropZones>
        <Buttons>
          <Button color="green" size="small">
            PUBLISH
          </Button>
          <Button color="red" size="small" onClick={() => handleRemoveWorld(world.id)}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </Button>
        </Buttons>
      </WorldData>
      <CoverImage src={world.coverS3} />
      <WorldPostsList posts={world.posts} worldId={world.id} />
    </WorldContainer>
  );
};

export { World };

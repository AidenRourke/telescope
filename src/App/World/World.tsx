import React, { FC } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PublisherType } from 'Types/types';
import axios from 'axios';

import * as colors from 'styles/colors';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropzone } from '../../Components/Dropzone';

const WorldContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  color: ${colors.blue};
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
`;

const CoverImage = styled.img`
  margin: 2rem;
  width: 20rem;
  object-fit: cover;
`;

export const GET_WORLD = gql`
  query GetWorld($id: ID!) {
    world(id: $id) {
      id
      title
      description
      status
      coverS3
      posts {
        id
        frame1S3
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

export const GET_SIGNED_REQUEST = gql`
  mutation SignS3 {
    signS3 {
      signedRequest
      url
    }
  }
`;

export const UPDATE_WORLD_IMAGE = gql`
  mutation UpdateWorldImage($worldId: ID!, $imageUrl: String!) {
    updateWorldImage(worldId: $worldId, imageUrl: $imageUrl) {
      world {
        id
        coverS3
      }
    }
  }
`;

const World: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();

  const { loading, data: worldData } = useQuery(GET_WORLD, { variables: { id } });

  const [getSignedRequest] = useMutation(GET_SIGNED_REQUEST);

  const [updateWorldImage] = useMutation(UPDATE_WORLD_IMAGE);

  const uploadToS3 = async (file: File, signedRequest: string) => {
    const options = {
      headers: {
        'Content-Type': '',
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const onDrop = async (acceptedFiles: File[]) => {
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
      <div>
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
          <Dropzone onDrop={onDrop}>
            <p>EDIT COVER IMAGE</p>
          </Dropzone>
        </DropZones>
      </div>
      <CoverImage src={world.coverS3} />
    </WorldContainer>
  );
};

export { World };

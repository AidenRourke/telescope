import React, { FC, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AccountType, PublisherType } from 'Types/types';
import axios from 'axios';

import * as colors from 'styles/colors';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropzone, Button, ConfirmationModal, DatePicker, EditableTitle, Input } from 'Components';
import { WorldMomentsList } from './WorldMomentsList';
import { GET_WORLDS } from '../Worlds/Worlds';
import { WorldPublishersModal } from './WorldPublishersModal';
import { WorldCuratorsModal } from './WorldCuratorsModal';

const WorldContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
`;

const WorldData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 40rem;
`;

const BackArrow = styled(FontAwesomeIcon)`
  margin-bottom: 2rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const Status = styled.h4`
  margin-top: 0;
  color: ${colors.blue};
  span {
    opacity: 0.7;
  }
`;

const TextArea = styled.textarea`
  color: ${colors.green};
  resize: none;
  border: none;
  background: none;
  font-family: inherit;
`;

const Description = styled.p`
  cursor: pointer;
  overflow: auto;
  color: ${colors.green};
  flex: 1;
`;

const DescriptionTextArea = styled(TextArea)`
  font-size: 1em;
  flex: 1;
`;

const WorldInfo = styled.div`
  color: ${colors.blue};
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
  small {
    margin: 0;
    opacity: 0.7;
  }
`;

const DropZones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  height: 8rem;
`;

const DropZoneImage = styled.div<{ url: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
`;

const DropZoneVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const CoverImage = styled.img`
  margin: 2rem;
  width: 25%;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
`;

const DivButton = styled.button`
  flex: 1;
  font: inherit;
  background: none;
  color: inherit;
  border: 3px solid transparent;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem;
  &:hover {
    border: 3px solid ${colors.blue};
  }
`;

export const GET_WORLD = gql`
  query GetWorld($id: ID!) {
    world(id: $id) {
      id
      title
      description
      status
      coverS3
      prerollS3
      releaseDate
      moments {
        id
        title
        coverS3
        isActive
      }
      publishers {
        id
        name
        accounts {
          id
          user {
            id
            preferredUsername
          }
        }
      }
    }
  }
`;

const GET_SIGNED_REQUEST = gql`
  mutation SignS3($type: String!) {
    signS3(type: $type) {
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

const UPDATE_WORLD_VIDEO = gql`
  mutation UpdateWorldVideo($worldId: ID!, $videoUrl: String!) {
    updateWorldVideo(worldId: $worldId, videoUrl: $videoUrl) {
      world {
        id
        prerollS3
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

const UPDATE_WORLD_TITLE = gql`
  mutation UpdateWorldTitle($worldId: ID!, $title: String!) {
    updateWorldTitle(worldId: $worldId, title: $title) {
      world {
        id
        title
      }
    }
  }
`;

const UPDATE_WORLD_DESCRIPTION = gql`
  mutation UpdateWorldDescription($worldId: ID!, $description: String!) {
    updateWorldDescription(worldId: $worldId, description: $description) {
      world {
        id
        description
      }
    }
  }
`;

const UPDATE_WORLD_RELEASE_DATE = gql`
  mutation UpdateWorldReleaseDate($worldId: ID!, $releaseDate: String!) {
    updateWorldReleaseDate(worldId: $worldId, releaseDate: $releaseDate) {
      world {
        id
        releaseDate
      }
    }
  }
`;

const UPDATE_WORLD_STATUS = gql`
  mutation UpdateWorldStatus($worldId: ID!, $status: String!) {
    updateWorldStatus(worldId: $worldId, status: $status) {
      world {
        id
        status
      }
    }
  }
`;

const World: FC<RouteComponentProps> = props => {
  const {
    history,
    location: { search },
  } = props;

  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isAddingPublisher, setIsAddingPublisher] = useState<boolean>(false);
  const [isViewingCurators, setIsViewingCurators] = useState<boolean>(false);
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [isUpdatingWorldImage, setIsUpdatingWorldImage] = useState(false);
  const [isUpdatingWorldVideo, setIsUpdatingWorldVideo] = useState(false);

  const { id } = useParams();

  const { loading, data } = useQuery(GET_WORLD, { variables: { id } });

  const [getSignedRequest] = useMutation(GET_SIGNED_REQUEST);
  const [updateWorldTitle] = useMutation(UPDATE_WORLD_TITLE);
  const [updateWorldDescription] = useMutation(UPDATE_WORLD_DESCRIPTION);
  const [updateWorldImage] = useMutation(UPDATE_WORLD_IMAGE);
  const [updateWorldVideo] = useMutation(UPDATE_WORLD_VIDEO);
  const [updateWorldStatus] = useMutation(UPDATE_WORLD_STATUS);
  const [removeWorld] = useMutation(REMOVE_WORLD, {
    refetchQueries: [{ query: GET_WORLDS }],
    awaitRefetchQueries: true,
  });
  const [updateWorldReleaseDate] = useMutation(UPDATE_WORLD_RELEASE_DATE);

  const handleRemoveWorld = async () => {
    await removeWorld({ variables: { worldId: world.id } });
    history.push({ pathname: '/worlds', search });
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
    if (isImage) setIsUpdatingWorldImage(true);
    else setIsUpdatingWorldVideo(true);

    const type = isImage ? 'png' : 'mp4';
    const res = await getSignedRequest({ variables: { type } });
    const {
      data: {
        signS3: { url, signedRequest },
      },
    } = res;
    await uploadToS3(acceptedFiles[0], signedRequest);

    if (isImage) {
      await updateWorldImage({ variables: { worldId: world.id, imageUrl: url } });
      setIsUpdatingWorldImage(false);
    } else {
      await updateWorldVideo({ variables: { worldId: world.id, videoUrl: url } });
      setIsUpdatingWorldVideo(false);
    }
  };

  const changeTitle = async (title: string) => {
    if (title !== world.title) {
      await updateWorldTitle({
        variables: {
          worldId: world.id,
          title,
        },
      });
    }
  };

  const changeDescription = async (e: any) => {
    const {
      target: { value: description },
    } = e;

    if (description !== world.description) {
      await updateWorldDescription({
        variables: {
          worldId: world.id,
          description,
        },
      });
    }
    setDescriptionEditMode(false);
  };

  const renderDescription = () => {
    if (descriptionEditMode) {
      return (
        <DescriptionTextArea
          autoFocus
          onBlur={(e: any) => changeDescription(e)}
          onFocus={(e: any) => {
            e.target.value = '';
            e.target.value = world.description;
          }}
        />
      );
    }
    return (
      <Description onClick={() => setDescriptionEditMode(true)}>
        {world.description || 'CLICK TO ADD DESCRIPTION'}
      </Description>
    );
  };

  const renderAction = () => {
    if (world.status === 'DRAFT') {
      return (
        <Button
          color="green"
          size="small"
          onClick={() => updateWorldStatus({ variables: { worldId: world.id, status: 'PUBLISHED' } })}
        >
          PUBLISH
        </Button>
      );
    } else if (world.status === 'PUBLISHED') {
      return (
        <Button
          color="red"
          size="small"
          onClick={() => updateWorldStatus({ variables: { worldId: world.id, status: 'ARCHIVED' } })}
        >
          ARCHIVE
        </Button>
      );
    } else {
      return (
        <Button
          color="blue"
          size="small"
          onClick={() => updateWorldStatus({ variables: { worldId: world.id, status: 'DRAFT' } })}
        >
          EDIT
        </Button>
      );
    }
  };

  const getCurators = () => {
    let curators: AccountType[] = [];
    world.publishers.map((publisher: PublisherType) => {
      if (publisher.accounts) {
        curators = [...curators, ...publisher.accounts];
      }
    });
    return curators;
  };

  const numPublishers = () => {
    return world.publishers.length;
  };

  if (loading) return null;

  const { world } = data;

  return (
    <>
      <WorldContainer>
        <WorldData>
          <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <Status>
            WORLD <span>({world.status.toUpperCase()})</span>
          </Status>
          <EditableTitle title={world.title} onChange={changeTitle} />
          {renderDescription()}
          <WorldInfo>
            <DivButton onClick={() => setIsViewingCurators(true)}>
              <small>CURATORS</small>
              <p>{getCurators().length}</p>
            </DivButton>
            <DatePicker
              selected={world.releaseDate}
              onChange={date => updateWorldReleaseDate({ variables: { worldId: world.id, releaseDate: date } })}
            />
            <DivButton onClick={() => setIsAddingPublisher(true)}>
              <small>PUBLISHERS</small>
              <p>{numPublishers()}</p>
            </DivButton>
          </WorldInfo>
          <DropZones>
            <Dropzone
              title="CHANGE VIDEO"
              onDrop={(files: File[]) => onDrop(files, false)}
              accept="video/mp4"
              isLoading={isUpdatingWorldVideo}
            >
              <DropZoneVideo autoPlay loop key={world.prerollS3}>
                <source src={world.prerollS3} type="video/mp4" />
              </DropZoneVideo>
            </Dropzone>
            <Dropzone
              title="CHANGE IMAGE"
              onDrop={(files: File[]) => onDrop(files, true)}
              accept="image/png"
              isLoading={isUpdatingWorldImage}
            >
              <DropZoneImage url={world.coverS3} />
            </Dropzone>
          </DropZones>
          <Buttons>
            {renderAction()}
            <Button color="red" size="small" onClick={() => setIsConfirming(true)}>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" />
            </Button>
          </Buttons>
        </WorldData>
        <CoverImage src={world.coverS3} />
        <WorldMomentsList moments={world.moments} worldId={world.id} />
      </WorldContainer>
      <ConfirmationModal
        isOpen={isConfirming}
        closeModal={() => setIsConfirming(false)}
        onConfirm={handleRemoveWorld}
      />
      <WorldPublishersModal world={world} isOpen={isAddingPublisher} closeModal={() => setIsAddingPublisher(false)} />
      <WorldCuratorsModal
        curators={getCurators()}
        isOpen={isViewingCurators}
        closeModal={() => setIsViewingCurators(false)}
      />
    </>
  );
};

export { World };

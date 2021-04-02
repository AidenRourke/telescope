import React, { FC, useState } from 'react';
import { RouteComponentProps, useHistory, useParams } from 'react-router';
import { gql } from 'apollo-boost';
import { MomentPostsList } from './MomentPostsList';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EditableInput, Dropzone, Button } from 'Components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { GET_WORLD } from '../World/World';

const MomentContainer = styled.div`
  margin: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MomentDetails = styled.div`
  flex: 1;
  margin-right: 1rem;
  min-width: 0;
`;

const MomentContent = styled.div`
  display: flex;
  margin-bottom: 1rem;
  overflow: hidden;
  height: 100%;
`;

const DropZoneImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

const DropZones = styled.div`
  justify-content: space-between;
  flex: 1;
  display: flex;
  height: 100%;
`;

const BackArrow = styled(FontAwesomeIcon)`
  margin-bottom: 2rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const GET_MOMENT = gql`
  query GetMoment($id: ID!) {
    moment(id: $id) {
      id
      title
      coverS3
      isActive
      momentPosts {
        id
        category
        post {
          id
          title
          frame1S3
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

const UPDATE_MOMENT_IMAGE = gql`
  mutation UpdateMomentImage($momentId: ID!, $imageUrl: String!) {
    updateMomentImage(momentId: $momentId, imageUrl: $imageUrl) {
      moment {
        id
        coverS3
      }
    }
  }
`;

const UPDATE_MOMENT_TITLE = gql`
  mutation UpdateMomentTitle($momentId: ID!, $title: String!) {
    updateMomentTitle(momentId: $momentId, title: $title) {
      moment {
        id
        title
      }
    }
  }
`;

const UPDATE_WORLD_ACTIVE = gql`
  mutation UpdateWorldActive($isActive: Boolean!, $momentId: ID!) {
    updateWorldActive(isActive: $isActive, momentId: $momentId) {
      moment {
        id
        isActive
      }
    }
  }
`;

const Moment: FC<RouteComponentProps> = props => {
  const [isUpdatingMomentImage, setIsUpdatingMomentImage] = useState(false);

  const { momentId, worldId } = useParams();
  const history = useHistory();

  const { loading, data } = useQuery(GET_MOMENT, { variables: { id: momentId } });

  const [getSignedRequest] = useMutation(GET_SIGNED_REQUEST);
  const [updateMomentImage] = useMutation(UPDATE_MOMENT_IMAGE);
  const [updateMomentTitle] = useMutation(UPDATE_MOMENT_TITLE);
  const [updateWorldActive] = useMutation(UPDATE_WORLD_ACTIVE, {
    refetchQueries: [{ query: GET_WORLD, variables: { id: worldId } }],
  });

  const changeTitle = async (title: string) => {
    if (title !== data.moment.title) {
      await updateMomentTitle({
        variables: {
          momentId,
          title,
        },
      });
    }
  };

  const uploadToS3 = async (file: File, signedRequest: string) => {
    const options = {
      headers: {
        'Content-Type': '',
      },
    };
    await axios.put(signedRequest, file, options);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUpdatingMomentImage(true);

    const type = 'png';
    const res = await getSignedRequest({ variables: { type } });
    const {
      data: {
        signS3: { url, signedRequest },
      },
    } = res;
    await uploadToS3(acceptedFiles[0], signedRequest);

    await updateMomentImage({ variables: { momentId, imageUrl: url } });
    setIsUpdatingMomentImage(false);
  };

  const renderAction = () => {
    if (!data.moment.isActive) {
      return (
        <Button
          color="green"
          size="small"
          onClick={() => updateWorldActive({ variables: { isActive: true, momentId } })}
        >
          ACTIVATE
        </Button>
      );
    } else
      return (
        <Button
          color="red"
          size="small"
          onClick={() => updateWorldActive({ variables: { isActive: false, momentId } })}
        >
          DEACTIVATE
        </Button>
      );
  };

  if (loading) return null;

  return (
    <>
      <MomentContainer>
        <div>
          <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
        </div>
        <EditableInput type="h1" title={data.moment.title} placeholder="CLICK TO ADD TITLE" onChange={changeTitle} />
        <MomentContent>
          <MomentDetails>
            <DropZones>
              <Dropzone
                title=""
                isLoading={isUpdatingMomentImage}
                onDrop={(files: File[]) => onDrop(files)}
                accept="image/png"
              >
                <DropZoneImage src={data.moment.coverS3} />
              </Dropzone>
            </DropZones>
          </MomentDetails>
          <MomentPostsList momentPosts={data.moment.momentPosts} momentId={data.moment.id} />
        </MomentContent>
        <Buttons>
          {renderAction()}
          <Button color="red" size="small" onClick={() => console.log('blah')}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </Button>
        </Buttons>
      </MomentContainer>
    </>
  );
};

export { Moment };

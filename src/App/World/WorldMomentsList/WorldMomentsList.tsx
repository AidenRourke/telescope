import React, { FC } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { MomentType } from 'Types/types';
import * as colors from 'styles/colors';
import { Loading } from 'Components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { GET_WORLDS } from '../../Worlds/Worlds';

const WorldMomentsListContainer = styled.div`
  width: 18rem;
  overflow: auto;
`;

const WorldMomentContainer = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MomentInformation = styled.div`
  flex: 1;
`;

const WorldMomentImage = styled.img`
  object-fit: cover;
  width: 3rem;
  height: 5rem;
  border: 2px solid white;
  margin-right: 1rem;
`;

const AddMomentImage = styled.div`
  width: 3rem;
  height: 5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${colors.blue};
  }
`;

const Title = styled.p`
  color: ${colors.green};
`;

const Author = styled.p`
  color: ${colors.blue};
`;

const RemoveMomentButton = styled.button`
  margin-left: 0.5rem;
  color: ${colors.red};
  cursor: pointer;
  background: none;
  border: none;
`;

const REMOVE_MOMENT = gql`
  mutation RemoveMoment($momentId: ID!) {
    removeMoment(momentId: $momentId) {
      world {
        id
        moments {
          id
        }
      }
    }
  }
`;

const CREATE_MOMENT = gql`
  mutation CreateMoment($worldId: ID!) {
    createMoment(worldId: $worldId) {
      moment {
        id
      }
    }
  }
`;

interface Props {
  moments: MomentType[];
  worldId: string;
}

const WorldMomentsList: FC<Props> = ({ moments, worldId }) => {
  const history = useHistory();
  const { search } = useLocation();

  const [createMoment] = useMutation(CREATE_MOMENT);

  const handleCreateMoment = async () => {
    const res = await createMoment({ variables: { worldId } });
    const {
      data: {
        createMoment: { moment },
      },
    } = res;
    history.push({ pathname: `/moments/${moment.id}`, search });
  };

  const [removeWorldMoment, { loading: isRemoving }] = useMutation(REMOVE_MOMENT);

  const handleDelete = (e: any, momentId: string) => {
    e.stopPropagation();
    removeWorldMoment({
      variables: {
        momentId,
      },
    });
  };

  const renderMoment = (moment: MomentType) => {
    return (
      <WorldMomentContainer onClick={() => history.push({ pathname: `/moments/${moment.id}`, search })}>
        <WorldMomentImage src={moment.coverS3} />
        {isRemoving ? (
          <MomentInformation>
            <Loading>
              <small>REMOVING</small>
            </Loading>
          </MomentInformation>
        ) : (
          <MomentInformation>
            <Title>{moment.title}</Title>
            {/*<Author>{post.user?.preferredUsername}</Author>*/}
          </MomentInformation>
        )}
        <RemoveMomentButton onClick={(e: any) => handleDelete(e, moment.id)}>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </RemoveMomentButton>
      </WorldMomentContainer>
    );
  };

  return (
    <WorldMomentsListContainer>
      {moments.map(moment => renderMoment(moment))}
      <WorldMomentContainer onClick={() => handleCreateMoment()}>
        <AddMomentImage>
          <svg xmlns="http://www.w3.org/2000/svg" height="30%" viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </AddMomentImage>
        <MomentInformation>
          <Title>NEW MOMENT</Title>
        </MomentInformation>
      </WorldMomentContainer>
    </WorldMomentsListContainer>
  );
};

export { WorldMomentsList };

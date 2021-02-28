import React, {FC, useState} from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { MomentType } from 'Types/types';
import * as colors from 'styles/colors';
import { Loading } from 'Components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { GET_WORLD } from '../World';
import { ConfirmationModal } from '../../../Components/ConfirmationModal';

const WorldMomentsListContainer = styled.div`
  margin: 2rem ;
  min-width: 12rem;
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
  display: flex;
  flex-direction: column;
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
  border: 2px solid transparent;
  svg {
    fill: ${colors.blue};
  }
`;

const Title = styled.small`
  color: ${colors.blue};
`;

const Status = styled.small`
  color: ${colors.green};
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
  const [isConfirming, setIsConfirming] = useState<string>();

  const history = useHistory();
  const { search } = useLocation();

  const [createMoment] = useMutation(CREATE_MOMENT, {
    refetchQueries: [{ query: GET_WORLD, variables: { id: worldId } }],
  });

  const handleCreateMoment = async () => {
    const res = await createMoment({ variables: { worldId } });
    const {
      data: {
        createMoment: { moment },
      },
    } = res;
    history.push({ pathname: `/worlds/${worldId}/moments/${moment.id}`, search });
  };

  const [removeWorldMoment, { loading: isRemoving }] = useMutation(REMOVE_MOMENT);

  const handleDelete = () => {
    removeWorldMoment({
      variables: {
        momentId: isConfirming,
      },
    });
  };

  const handleConfirm = (e: any, momentId: string) => {
    e.stopPropagation();
    setIsConfirming(momentId);
  };

  // TODO:  REMOVING STATE
  const renderMoment = (moment: MomentType) => {
    return (
      <WorldMomentContainer
        onClick={() => history.push({ pathname: `/worlds/${worldId}/moments/${moment.id}`, search })}
      >
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
            {moment.isActive && <Status>ACTIVE</Status>}
          </MomentInformation>
        )}
        <RemoveMomentButton onClick={(e: any) => handleConfirm(e, moment.id)}>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </RemoveMomentButton>
      </WorldMomentContainer>
    );
  };

  return (
    <>
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
      <ConfirmationModal isOpen={!!isConfirming} closeModal={() => setIsConfirming(undefined)} onConfirm={handleDelete} />
    </>
  );
};

export { WorldMomentsList };

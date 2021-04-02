import React, {FC, useState} from "react";
import {MomentType} from "Types/types";
import {Loading} from "Components/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import * as colors from "styles/colors";
import {ConfirmationModal} from "Components/ConfirmationModal";
import {useMutation} from "@apollo/react-hooks";
import {useHistory, useLocation} from "react-router";
import {gql} from 'apollo-boost';

const WorldMomentContainer = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const WorldMomentImage = styled.img`
  object-fit: cover;
  width: 3rem;
  height: 5rem;
  border: 2px solid white;
  margin-right: 1rem;
`;

const MomentInformation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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


interface Props {
  moment: MomentType;
  worldId: string;
}

export const WorldMomentListItem: FC<Props> = ({moment, worldId}) => {
  const [isConfirming, setIsConfirming] = useState<string>();

  const history = useHistory();
  const {search} = useLocation();

  const [removeWorldMoment, {loading: isRemoving}] = useMutation(REMOVE_MOMENT);

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

  return (
    <>
      <WorldMomentContainer
      onClick={() => history.push({pathname: `/worlds/${worldId}/moments/${moment.id}`, search})}
    >
      <WorldMomentImage src={moment.coverS3}/>
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
        <FontAwesomeIcon icon={faMinus} size="lg"/>
      </RemoveMomentButton>
    </WorldMomentContainer>
      <ConfirmationModal isOpen={!!isConfirming} closeModal={() => setIsConfirming(undefined)}
                         onConfirm={handleDelete}/>
    </>
  );
}
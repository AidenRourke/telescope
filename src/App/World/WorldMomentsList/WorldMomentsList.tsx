import React, {FC} from 'react';
import styled from 'styled-components';
import {gql} from 'apollo-boost';
import {MomentType} from 'Types/types';
import * as colors from 'styles/colors';
import {useHistory, useLocation} from 'react-router';
import {useMutation} from '@apollo/react-hooks';
import {GET_WORLD} from '../World';
import {WorldMomentListItem} from './WorldMomentListItem';

const WorldMomentsListContainer = styled.div`
  margin: 2rem ;
  min-width: 12rem;
  overflow: auto;
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

const WorldMomentContainer = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Title = styled.small`
  color: ${colors.blue};
`;

const MomentInformation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

const WorldMomentsList: FC<Props> = ({moments, worldId}) => {
  const history = useHistory();
  const {search} = useLocation();

  const [createMoment] = useMutation(CREATE_MOMENT, {
    refetchQueries: [{query: GET_WORLD, variables: {id: worldId}}],
  });

  const handleCreateMoment = async () => {
    const res = await createMoment({variables: {worldId}});
    const {
      data: {
        createMoment: {moment},
      },
    } = res;
    history.push({pathname: `/worlds/${worldId}/moments/${moment.id}`, search});
  };

  return (
    <WorldMomentsListContainer>
      {moments.map(moment => <WorldMomentListItem worldId={worldId} moment={moment}/>)}
      <WorldMomentContainer onClick={() => handleCreateMoment()}>
        <AddMomentImage>
          <svg xmlns="http://www.w3.org/2000/svg" height="30%" viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
          </svg>
        </AddMomentImage>
        <MomentInformation>
          <Title>NEW MOMENT</Title>
        </MomentInformation>
      </WorldMomentContainer>
    </WorldMomentsListContainer>
  );
};

export {WorldMomentsList};

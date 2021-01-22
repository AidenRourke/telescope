import React, { FC, useContext, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { gql } from 'apollo-boost';

import { Navbar } from '../Navbar';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PublisherType, WorldType } from 'Types/types';
import { UserContext } from 'Contexts/UserContext';

const WorldsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 2rem 2rem 3rem;
  overflow: scroll;
`;

const AddWorldButton = styled.div`
  box-sizing: border-box;
  opacity: 0.7;
  margin-right: 2rem;
  height: 80%;
  min-width: 20rem;
  max-width: 20rem;
  cursor: pointer;
  transition: transform 0.135s cubic-bezier(0, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${colors.blue};

  &:hover {
    transform: scale(0.97);
  }
  svg {
    fill: ${colors.blue};
    height: 30%;
  }
`;

const WorldButton = styled.img<{ selected: boolean }>`
  object-fit: cover;
  min-width: 20rem;
  max-width: 20rem;
  height: 80%;
  opacity: ${({ selected }) => (selected ? 0.8 : 0.2)};
  // border: 3px solid ${({ selected }) => (selected ? colors.blue : 'transparent')};
  cursor: pointer;
  margin-right: 2rem;
  transition: transform 0.135s cubic-bezier(0, 0, 0.2, 1);
  &:hover {
    transform: scale(0.97);
  }
`;

const WorldMetaData = styled.div`
  width: 100%;
  max-height: 100%;
  h4 {
    margin-bottom: 0;
    &:first-of-type {
      margin-top: 0;
    }
  }
`;

export const GET_WORLDS = gql`
  query GetWorlds {
    worlds {
      id
      title
      coverS3
    }
  }
`;

const CREATE_WORLD = gql`
  mutation CreateWorld {
    createWorld {
      world {
        id
      }
    }
  }
`;

const Worlds: FC<RouteComponentProps> = props => {
  const { user } = useContext(UserContext);

  const [selection, setSelection] = useState<number>(0);

  const history = useHistory();

  const { loading, data } = useQuery(GET_WORLDS);
  const [createWorld] = useMutation(CREATE_WORLD, { refetchQueries: [{ query: GET_WORLDS }] });

  const handleCreateWorld = async () => {
    const res = await createWorld();
    const {
      data: {
        createWorld: { world },
      },
    } = res;
    history.push({ pathname: `/worlds/${world.id}`, search: props.location.search });
  };

  const getCurators = () => {
    const curators: string[] = [];
    data.worlds[selection]?.publishers.map((publisher: any) => {
      publisher.accounts.map((account: any) => curators.push(account.user.preferredUsername));
    });
    return curators.join(', ');
  };

  const renderMetaData = () => {
    if (loading || selection < 0) return null;
    return (
      <WorldMetaData>
        {/*<h4>TITLE</h4>*/}
        {/*<small>{data.worlds[selection]?.title}</small>*/}
        {/*<h4>PUBLISHERS</h4>*/}
        {/*<small>{data.worlds[selection]?.publishers.map((publisher: PublisherType) => publisher.name).join(', ')}</small>*/}
        {/*<h4>MOMENTS</h4>*/}
        {/*<small>{data.worlds[selection]?.moments.length}</small>*/}
        {/*<h4>CURATORS</h4>*/}
        {/*<small>{getCurators()}</small>*/}
      </WorldMetaData>
    );
  };

  const renderAddWorld = () => {
    return (
      <AddWorldButton onMouseOver={() => setSelection(-1)} onClick={() => handleCreateWorld()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </AddWorldButton>
    );
  };

  const renderWorlds = () => {
    if (loading) return null;

    return data.worlds.map((world: WorldType, i: number) => (
      // I'd like to use the photo gallery for this
      <WorldButton
        key={world.id}
        src={world.coverS3}
        onMouseOver={() => setSelection(i)}
        selected={selection === i}
        onClick={() => history.push({ pathname: `/worlds/${world.id}`, search: props.location.search })}
      />
    ));
  };

  return (
    <>
      <Navbar {...props}>{renderMetaData()}</Navbar>
      <WorldsContainer>
        {user.isAdmin && renderAddWorld()}
        {renderWorlds()}
      </WorldsContainer>
    </>
  );
};

export { Worlds };

import React, { FC, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { gql } from 'apollo-boost';

import { Navbar } from '../Navbar';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { PublisherType, WorldType } from 'Types/types';
import { Modal } from 'Components/Modal';
import { CreateWorld } from './CreateWorld';

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

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
  }
`;

const WorldButton = styled.img<{ selected: boolean }>`
  object-fit: cover;
  width: 20rem;
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
      posts {
        id
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

const Worlds: FC<Props> = props => {
  const [selection, setSelection] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const { loading, data } = useQuery(GET_WORLDS);

  const renderMetaData = () => {
    if (loading || selection < 0) return null;
    return (
      <WorldMetaData>
        <h4>TITLE</h4>
        <small>{data.worlds[selection]?.title}</small>
        <h4>PUBLISHER</h4>
        <small>{data.worlds[selection]?.publishers.map((publisher: PublisherType) => publisher.name).join(', ')}</small>
        <h4>POSTS</h4>
        <small>{data.worlds[selection]?.posts.length}</small>
        <h4>CURATORS</h4>
        <small>
          {data.worlds[selection]?.publishers
            .map((publisher: any) => publisher.accounts.map((account: any) => account.user.preferredUsername))
            .join(', ')}
        </small>
      </WorldMetaData>
    );
  };

  const renderAddWorld = () => {
    return (
      <AddWorldButton onMouseOver={() => setSelection(-1)} onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="30%" viewBox="0 0 24 24">
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
        onClick={() => history.push(`/worlds/${world.id}`)}
      />
    ));
  };

  return (
    <>
      <Navbar {...props}>{renderMetaData()}</Navbar>
      <WorldsContainer>
        {renderAddWorld()}
        {renderWorlds()}
      </WorldsContainer>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <CreateWorld />
      </Modal>
    </>
  );
};

export { Worlds };

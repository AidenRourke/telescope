import React, { FC, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { gql } from 'apollo-boost';

import { Navbar } from '../Navbar';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { PublisherType, WorldType } from 'Types/types';

interface Props extends RouteComponentProps {
  setIsAuthenticated: (value: boolean) => void;
}

const WorldsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 2rem 2rem 3rem;
  overflow: scroll;
`;

const World = styled.img<{ selected: boolean }>`
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
  const [preview, setPreview] = useState<number>(0);
  const history = useHistory();

  const { loading, data } = useQuery(GET_WORLDS);

  const renderMetaData = () => {
    if (loading) return null;

    return (
      <WorldMetaData>
        <h4>TITLE</h4>
        <small>{data.worlds[preview]?.title}</small>
        <h4>PUBLISHER</h4>
        <small>{data.worlds[preview]?.publishers.map((publisher: PublisherType) => publisher.name).join(', ')}</small>
        <h4>POSTS</h4>
        <small>{data.worlds[preview]?.posts.length}</small>
        <h4>CURATORS</h4>
        <small>
          {data.worlds[preview]?.publishers
            .map((publisher: any) => publisher.accounts.map((account: any) => account.user.preferredUsername))
            .join(', ')}
        </small>
      </WorldMetaData>
    );
  };

  const renderWorlds = () => {
    if (loading) return null;

    return data.worlds.map((world: WorldType, i: number) => (
      // I'd like to use the photo gallery for this
      <World
        key={world.id}
        src={world.coverS3}
        onMouseOver={() => setPreview(i)}
        selected={preview === 0}
        onClick={() => history.push(`/worlds/${world.id}`)}
      />
    ));
  };

  return (
    <>
      <Navbar {...props}>{renderMetaData()}</Navbar>
      <WorldsContainer>{renderWorlds()}</WorldsContainer>
    </>
  );
};

export { Worlds };

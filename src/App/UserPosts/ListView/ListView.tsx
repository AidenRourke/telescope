import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { useHistory, useLocation } from 'react-router-dom';

import { Button } from 'Components';

import { useQuery } from '@apollo/react-hooks';
import { PostType } from 'Types/types';
import { queryToObject } from '../../App';

const ListViewContainer = styled.div`
  overflow: scroll;
`;

const LoadMoreButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const ImageContainer = styled.div<{ top?: number; left?: number; height: number; width: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  cursor: pointer;
  overflow: hidden;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  margin: 2px;
`;

const Image = styled.img<{ sx: number; sy: number }>`
  object-fit: cover;
  transition: transform 0.135s cubic-bezier(0, 0, 0.2, 1);
  &:hover {
    transform: translateZ(0px) scale3d(${({ sx, sy }) => `${sx}, ${sy}`}, 2);
  }
`;

interface Props {
  label: string;
}

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String, $filter: FilterInput!) {
    posts(first: $first, after: $after, filter: $filter) {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      nodes {
        id
        frame1S3
      }
    }
  }
`;

const PAGE_SIZE = 3;

const ListView: FC<Props> = () => {
  const history = useHistory();
  const { search } = useLocation();

  const filters = queryToObject(search);
  const filter = {
    preferredUsernames: filters['USER'],
    locations: filters['LOCATION'],
    tags: filters['TAG'],
  };

  const { loading, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      filter,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return null;

  const {
    posts: { nodes, pageInfo },
  } = data;

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        after: pageInfo.endCursor,
        first: PAGE_SIZE,
      },
      updateQuery(previousResult: any, { fetchMoreResult }: any) {
        const connection = fetchMoreResult.posts;

        return {
          posts: {
            pageInfo: connection.pageInfo,
            nodes: [...previousResult.posts.nodes, ...connection.nodes],
            __typename: previousResult.posts.__typename,
          },
        };
      },
    });
  };

  const imageRenderer = ({ index, left, top, photo }: RenderImageProps) => {
    const { sizes, srcSet, key, ...photoProps } = photo;
    const { height, width } = photoProps;

    const sx = (100 - (10 / width) * 100) / 100;
    const sy = (100 - (10 / height) * 100) / 100;

    return (
      <ImageContainer key={key} top={top} left={left} height={height} width={width}>
        <Image {...photoProps} onClick={() => history.push({ pathname: `/posts/${key}`, search })} sx={sx} sy={sy} />
      </ImageContainer>
    );
  };

  const getPhotos = () => {
    return nodes.map((post: PostType) => ({
      src: post.frame1S3,
      width: 2,
      height: 3,
      key: post.id,
    }));
  };

  return (
    <ListViewContainer>
      {data.posts.nodes.length > 0 && <Gallery photos={getPhotos()} direction="column" renderImage={imageRenderer} />}
      {pageInfo.hasNextPage && (
        <LoadMoreButton>
          <Button onClick={handleFetchMore} size="small" color="green" isLoading={loading}>
            LOAD MORE
          </Button>
        </LoadMoreButton>
      )}
    </ListViewContainer>
  );
};

export { ListView };

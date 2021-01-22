import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { useHistory, useLocation } from 'react-router-dom';

import { FilterSearch } from 'Components/index';

import { useQuery } from '@apollo/react-hooks';
import { PostType } from 'Types/types';
import { queryToObject } from '../../App';

const ListViewContainer = styled.div`
  overflow: scroll;
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
  query GetPosts($filter: FilterInput!) {
    posts(filter: $filter) {
      id
      frame1S3
    }
  }
`;

const ListView: FC<Props> = () => {
  const history = useHistory();
  const { search } = useLocation();

  const filters = queryToObject(search);

  const { loading, data } = useQuery(GET_POSTS, {
    variables: {
      filter: {
        preferredUsernames: filters['USER'] || [],
        locations: filters['LOCATION'] || [],
        tags: filters['TAG'] || [],
      },
    },
    fetchPolicy: 'network-only',
  });

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
    return data.posts.map((post: PostType) => ({
      src: post.frame1S3,
      width: 3,
      height: 4,
      key: post.id,
    }));
  };

  return (
    <ListViewContainer>
      {!loading && data.posts.length > 0 && (
        <Gallery photos={getPhotos()} direction="column" renderImage={imageRenderer} />
      )}
    </ListViewContainer>
  );
};

export { ListView };

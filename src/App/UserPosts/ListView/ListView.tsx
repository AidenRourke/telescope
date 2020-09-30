import React, { FC, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { useHistory, useLocation } from 'react-router-dom';

import { FilterSearch } from 'Components/index';

import { useQuery } from '@apollo/react-hooks';
import qs from 'query-string';
import { PostType, FilterType } from 'Types/types';

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

const filtersToQueries = (filters: any) => {
  return qs.stringify(filters, { arrayFormat: 'comma' });
};

const queriesToFilters = (location: any) => {
  return qs.parse(location.search, { arrayFormat: 'comma' });
};

// TODO: keep scroll pos

const ListView: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();

  const [filters, setFilters] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    queriesToFilters(location),
  );

  useEffect(() => {
    history.push({ search: filtersToQueries(filters) });
  }, [filters]);

  const { loading, data } = useQuery(GET_POSTS, {
    variables: {
      filter: {
        preferredUsernames: filters['USER'] || [],
        locations: filters['LOCATION'] || [],
        tags: filters['TAG'] || [],
      },
    },
  });

  const addTag = ({ name, type }: FilterType) => {
    const oldFilters = filters[type];
    const newFilter = name.toLowerCase();
    let newFilters;
    if (Array.isArray(oldFilters)) {
      newFilters = [...oldFilters, newFilter];
    } else if (oldFilters) {
      newFilters = [oldFilters, newFilter];
    } else {
      newFilters = [newFilter];
    }
    setFilters({
      [type]: newFilters,
    });
  };

  const removeTag = ({ type, name }: FilterType) => {
    setFilters({
      [type]: Array.isArray(filters[type]) ? filters[type].filter((filter: any) => filter !== name) : [],
    });
  };

  const imageRenderer = ({ index, left, top, photo }: RenderImageProps) => {
    const { sizes, srcSet, key, ...photoProps } = photo;
    const { height, width } = photoProps;

    const sx = (100 - (10 / width) * 100) / 100;
    const sy = (100 - (10 / height) * 100) / 100;

    return (
      <ImageContainer key={key} top={top} left={left} height={height} width={width}>
        <Image {...photoProps} onClick={() => history.push(`/posts/${key}`)} sx={sx} sy={sy} />
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
    <>
      <FilterSearch
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addTag={addTag}
        filters={filters}
        removeTag={removeTag}
        options={['USER', 'LOCATION', 'TAG']}
      />
      <ListViewContainer>
        {!loading && data.posts.length > 0 && (
          <Gallery photos={getPhotos()} direction="column" renderImage={imageRenderer} />
        )}
      </ListViewContainer>
    </>
  );
};

export { ListView };

import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';

import { FilterSearch } from 'Components/index';
import { blue } from 'styles/colors';

import male from 'assets/login_male.gif';
import female from 'assets/login_female.gif';

const ListViewContainer = styled.div``;

interface Props {
  label: string;
}

const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: female,
    width: 3,
    height: 4,
  },
  {
    src: male,
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    width: 4,
    height: 3,
  },
];

const ListView: FC<Props> = () => {
  return (
    <>
      <FilterSearch />
      <ListViewContainer>
        <Gallery photos={photos} direction="column" />
      </ListViewContainer>
    </>
  );
};

export { ListView };

import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { useHistory } from 'react-router-dom';

import { FilterSearch } from 'Components/index';

import image_1 from 'assets/IMG_7302.gif';
import image_2 from 'assets/IMG_7305.gif';
import image_4 from 'assets/IMG_7306.gif';
import image_5 from 'assets/IMG_7317.gif';
import image_6 from 'assets/IMG_7301.gif';
import image_7 from 'assets/IMG_7308.gif';
import image_8 from 'assets/IMG_7319.gif';
import image_9 from 'assets/IMG_7321.gif';
import image_10 from 'assets/IMG_6285.gif';

// import image_11 from 'assets/';

const ListViewContainer = styled.div`
  overflow: scroll;
  img {
    object-fit: cover;
  }
`;

const ImageContainer = styled.div<{ top?: number; left?: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Image = styled.img`
  cursor: pointer;
`;

interface Props {
  label: string;
}

const photos = [
  {
    src: image_1,
    width: 3,
    height: 4,
    key: '1',
  },
  {
    src: image_2,
    width: 3,
    height: 4,
    key: '2',
  },
  {
    src: image_8,
    width: 3,
    height: 4,
    key: '3',
  },
  {
    src: image_9,
    width: 3,
    height: 4,
    key: '4',
  },
  {
    src: image_4,
    width: 3,
    height: 4,
    key: '5',
  },
  {
    src: image_5,
    width: 3,
    height: 4,
    key: '6',
  },
  {
    src: image_6,
    width: 3,
    height: 4,
    key: '7',
  },
  {
    src: image_7,
    width: 3,
    height: 4,
    key: '8',
  },
  {
    src: image_10,
    width: 3,
    height: 4,
    key: '9',
  },
];

const ListView: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const history = useHistory();

  const imageRenderer = ({ index, left, top, photo: { sizes, srcSet, key, ...photoProps } }: RenderImageProps) => {
    return (
      <ImageContainer key={key} top={top} left={left}>
        <Image {...photoProps} onClick={() => history.push(`/posts/${key}`)} />
      </ImageContainer>
    );
  };

  return (
    <>
      <FilterSearch isOpen={isOpen} setIsOpen={setIsOpen} />
      <ListViewContainer>
        <Gallery photos={photos} direction="column" renderImage={imageRenderer} />
      </ListViewContainer>
    </>
  );
};

export { ListView };

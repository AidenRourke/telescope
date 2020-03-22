import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { useHistory } from 'react-router-dom';

import { FilterSearch } from 'Components/index';

import { photos } from 'App/mockData';

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

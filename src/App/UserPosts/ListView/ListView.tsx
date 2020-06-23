import React, {FC, useState} from 'react';
import styled from 'styled-components';
import Gallery, {RenderImageProps} from 'react-photo-gallery';
import {useHistory} from 'react-router-dom';

import {FilterSearch} from 'Components/index';

import {photos} from 'App/mockData';
import {blue} from 'styles/colors';

const ListViewContainer = styled.div`
  overflow: scroll;
`;

const ImageContainer = styled.div<{ top?: number; left?: number; height: number; width: number }>`
  position: absolute;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  cursor: pointer;
  overflow: hidden;
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;
  margin: 2px;
`;

const Image = styled.img<{ sx: number; sy: number }>`
  object-fit: cover;
  transition: transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s;
  &:hover {
     transform: translateZ(0px) scale3d(${({ sx, sy }) => `${sx}, ${sy}`}, 2);
  }
`;

interface Props {
  label: string;
}

const ListView: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const history = useHistory();

  const imageRenderer = ({index, left, top, photo}: RenderImageProps) => {
    const {sizes, srcSet, key, ...photoProps} = photo;
    const {height, width} = photoProps;

    const sx = (100 - (10 / width) * 100) / 100;
    const sy = (100 - (10 / height) * 100) / 100;

    return (
      <ImageContainer key={key} top={top} left={left} height={height} width={width}>
        <Image {...photoProps} onClick={() => history.push(`/posts/${key}`)} sx={sx} sy={sy}/>
      </ImageContainer>
    );
  };

  return (
    <>
      <FilterSearch isOpen={isOpen} setIsOpen={setIsOpen}/>
      <ListViewContainer>
        <Gallery photos={photos} direction="column" renderImage={imageRenderer}/>
      </ListViewContainer>
    </>
  );
};

export {ListView};

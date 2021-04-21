import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const Film3dImage = styled.img`
  height: 80%;
`;

interface Props {
  images: string[];
}

const Film3d: FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [intervalObject, setIntervalObject] = useState();

  const incrementImage = (currentImage: number) => {
    if (currentImage === 3) {
      return 0;
    } else {
      return currentImage + 1;
    }
  };

  const checkImage = (src: string) =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    });

  useEffect(() => {
    Promise.all(images.map(checkImage)).then(() => {
      const interval = setInterval(() => {
        setCurrentImage(incrementImage);
      }, 142.5);
      setIntervalObject(interval);
    });
    return () => clearInterval(intervalObject)
  }, []);

  useEffect(() => {
    return () => {
      if (intervalObject) {
        clearInterval(intervalObject);
      }
    };
  }, [intervalObject]);

  return <Film3dImage src={images[currentImage]} />;
};

export { Film3d };

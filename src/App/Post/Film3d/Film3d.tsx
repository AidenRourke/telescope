import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const Film3dImage = styled.img`
  object-fit: cover;
  height: 80%;
  width: 30rem;
`;

interface Props {
  images: string[];
}

const Film3d: FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(1);

  const incrementImage = (currentImage: number) => {
    if (currentImage === 3) {
      return 1;
    } else {
      return currentImage + 1;
    }
  };

  useEffect(() => {
    images.forEach(image => {
      new Image().src = image;
    });

    const interval = setInterval(() => {
      setCurrentImage(incrementImage);
    }, 142.5);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Film3dImage src={images[currentImage]} />;
};

export { Film3d };

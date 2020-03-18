import React, { FC } from 'react';
import ReactGlobe from 'react-globe';

interface Props {
  label: string;
}

const GlobeView: FC<Props> = () => {
  return (
    <ReactGlobe
      cameraOptions={{ enableZoom: false }}
      globeOptions={{
        enableBackground: false,
        cloudsOpacity: 0.05,
        glowCoefficient: 0.1,
        glowColor: '#fff9e6',
        glowPower: 5,
        glowRadiusScale: 0.2,
        texture: 'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg',
      }}
    />
  );
};

export { GlobeView };

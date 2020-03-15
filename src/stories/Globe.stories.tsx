import React from 'react';
import ReactGlobe from 'react-globe';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

const Globe = () => {
    const background = 'background_milky_way.jpg';
    const clouds = 'clouds.png';
    const globe = 'globe_dark.jpg';

    return (
        <ReactGlobe
            size={[800, 800]}
            globeOptions={{
                backgroundTexture: `https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/${background}`,
                cloudsTexture: `https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/${clouds}`,
                texture: `https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/${globe}`,
            }}
        />
    );
};

storiesOf('Globe', module)
    .addDecorator(centered)
    .add('Dark globe', () => <Globe />);

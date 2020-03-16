import React from 'react';
import { Button } from 'Components';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';



storiesOf('Button', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Modu Button', () => (
        <Button color={select('Colors', ['white', 'black', 'red'], 'black')}>{text('Label', 'Label')}</Button>
    ));

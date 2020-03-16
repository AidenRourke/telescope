import React from 'react';
import { Button } from 'Components';
import { select, text } from '@storybook/addon-knobs';

export default {
    title: 'Button',
};

export const defaultView = () => (
    <Button color={select('Colors', ['white', 'black', 'red'], 'black')}>{text('Label', 'Label')}</Button>
);

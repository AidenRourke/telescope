import React from 'react';
import { Button } from 'Components';
import { select, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Button',
};

export const defaultView = () => (
  <Button
    color={select('Colors', ['white', 'black', 'red', 'green', 'blue'], 'black')}
    isOutlined={boolean('outline', false)}
  >
    {text('Label', 'Label')}
  </Button>
);

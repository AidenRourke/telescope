import { addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(centered);
addDecorator(withKnobs);

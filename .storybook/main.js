const path = require('path');

module.exports = {
    stories: ['../src/stories/**/*.stories.(ts|tsx|js|jsx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/preset-create-react-App',
        '@storybook/addon-knobs/register',

        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
            },
        },
    ],
};

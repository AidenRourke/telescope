import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { black, white, red , green, blue} from 'styles/colors';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'default' | 'outlined';
  color?: 'white' | 'red' | 'green' | 'blue' | 'black';
}

const ButtonBase = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid transparent;
`;

const BlackButton = styled(ButtonBase)`
  background-color: ${black};
  color: ${white};
`;

const WhiteButton = styled(ButtonBase)`
  background-color: ${blue};
  color: ${black};
`;

const RedButton = styled(ButtonBase)`
  background-color: ${red};
  color: ${white};
`;

const GreenButton = styled(ButtonBase)`
    background-color: ${green};
    color: ${black};
`;

const BlueButton = styled(ButtonBase)`
    background-color: ${blue};
    color: ${black};
`;
const Button: FC<ButtonProps> = ({ type, color, children, className }) => {
    switch (color) {
        case 'black':
            return <BlackButton className={className}>{children}</BlackButton>;
        case 'red':
            return <RedButton className={className}>{children}</RedButton>;
        case 'green':
            return <GreenButton className={className}>{children}</GreenButton>;
        case 'blue':
            return <BlueButton className={className}>{children}</BlueButton>;
        default:
            return <WhiteButton className={className}>{children}</WhiteButton>;

}
};

Button.defaultProps = {
  type: 'default',
};

export { Button };

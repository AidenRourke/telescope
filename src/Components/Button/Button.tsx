import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { black, white, red } from 'styles/colors';

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
  background-color: ${white};
  color: ${black};
`;

const RedButton = styled(ButtonBase)`
  background-color: ${red};
  color: ${white};
`;

const Button: FC<ButtonProps> = ({ type, color, children, className }) => {
  switch (color) {
    case 'black':
      return <BlackButton className={className}>{children}</BlackButton>;
    case 'red':
      return <RedButton className={className}>{children}</RedButton>;
    default:
      return <WhiteButton className={className}>{children}</WhiteButton>;
  }
};

Button.defaultProps = {
  type: 'default',
};

export { Button };

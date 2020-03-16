import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { black, white, red, green, blue } from 'styles/colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

const GreenButton = styled(ButtonBase)`
  background-color: ${green};
  color: ${black};
`;

const BlueButton = styled(ButtonBase)`
  background-color: ${blue};
  color: ${black};
`;
const Button: FC<ButtonProps> = ({ color, children, ...rest }) => {
  switch (color) {
    case 'black':
      return <BlackButton {...rest}>{children}</BlackButton>;
    case 'red':
      return <RedButton {...rest}>{children}</RedButton>;
    case 'green':
      return <GreenButton {...rest}>{children}</GreenButton>;
    case 'blue':
      return <BlueButton {...rest}>{children}</BlueButton>;
    default:
      return <WhiteButton {...rest}>{children}</WhiteButton>;
  }
};

export { Button };

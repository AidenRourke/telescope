import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';

type ButtonColors = 'white' | 'red' | 'green' | 'blue' | 'black';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  isOutlined?: boolean;
}

const getTextColor = (color: ButtonColors, isOutlined: boolean | undefined) => {
  if (isOutlined) return colors[color];

  switch (color) {
    case 'black':
      return colors.white;
    case 'red':
      return colors.white;
    default:
      return colors.black;
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  border: 3px solid ${({ isOutlined, color }) => (isOutlined ? colors[color] : 'transparent')};
  background-color: ${({ isOutlined, color }) => (isOutlined ? 'transparent' : colors[color])};
  color: ${({ color, isOutlined }) => getTextColor(color, isOutlined)};
`;

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export { Button };

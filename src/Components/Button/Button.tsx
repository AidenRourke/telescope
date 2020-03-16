import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'white' | 'red' | 'green' | 'blue' | 'black';
  isOutlined?: boolean;
}

const getTextColor = (color: string) => {
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
  color: ${({ isOutlined, color }) => isOutlined ? colors.white : getTextColor(color)};
`;

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export { Button };

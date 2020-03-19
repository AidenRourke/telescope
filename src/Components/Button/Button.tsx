import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { colorTypes } from 'styles/colorTypes';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: colorTypes;
  isOutlined?: boolean;
  isText?: boolean;
}

const getTextColor = (color: colorTypes, isOutlined: boolean | undefined, isText: boolean | undefined) => {
  if (isOutlined || isText) return colors[color];

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
  padding: ${({ isText }) => (isText ? '0' : '1rem 2rem')};
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  border: 3px solid ${({ isOutlined, color, isText }) => (isOutlined && !isText ? colors[color] : 'transparent')};
  background-color: ${({ isOutlined, isText, color }) => (isOutlined || isText ? 'transparent' : colors[color])};
  color: ${({ color, isOutlined, isText }) => getTextColor(color, isOutlined, isText)};
`;

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export { Button };

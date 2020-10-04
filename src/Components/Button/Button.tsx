import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { colorTypes } from 'styles/colorTypes';
import { Loading } from '../Loading';
import { Sizes } from 'Types/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: colorTypes;
  isOutlined?: boolean;
  isText?: boolean;
  size?: Sizes;
  isLoading?: boolean;
}

const getTextColor = (color: colorTypes, isOutlined: boolean | undefined, isText: boolean | undefined) => {
  if (isOutlined || isText) return colors[color];

  switch (color) {
    case 'black':
      return colors.white;
    case 'red':
      return colors.white;
    case 'green':
      return colors.white;
    default:
      return colors.black;
  }
};

const getPadding = (isText: boolean | undefined, size: Sizes | undefined) => {
  if (isText) return '0';
  switch (size) {
    case 'small':
      return '0.75rem 1.75rem';
    default:
      return '1rem 2rem';
  }
};

const getFontSize = (size: Sizes | undefined) => {
  switch (size) {
    case 'small':
      return 0.75;
    default:
      return 1;
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ isText, size }) => getPadding(isText, size)};
  font-size: ${({ size }) => getFontSize(size)}rem;
  font-family: inherit;
  cursor: pointer;
  border: 3px solid ${({ isOutlined, color, isText }) => (isOutlined && !isText ? colors[color] : 'transparent')};
  background-color: ${({ isOutlined, isText, color }) => (isOutlined || isText ? 'transparent' : colors[color])};
  color: ${({ color, isOutlined, isText }) => getTextColor(color, isOutlined, isText)};
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Button: FC<ButtonProps> = ({ isLoading, children, ...rest }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loading>LOADING</Loading>;
    }
    return children;
  };

  return <StyledButton {...rest}>{renderContent()}</StyledButton>;
};

export { Button };

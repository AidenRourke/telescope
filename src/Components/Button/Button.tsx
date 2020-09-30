import React, { FC, ButtonHTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';
import * as colors from 'styles/colors';
import { colorTypes } from 'styles/colorTypes';

type buttonSizes = 'small' | 'regular';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: colorTypes;
  isOutlined?: boolean;
  isText?: boolean;
  size?: buttonSizes;
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

const getPadding = (isText: boolean | undefined, size: buttonSizes | undefined) => {
  if (isText) return '0';
  switch (size) {
    case 'small':
      return '0.75rem 1.75rem';
    default:
      return '1rem 2rem';
  }
};

const getFontSize = (size: buttonSizes | undefined) => {
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

const ellipsis = keyframes`
  to {
    width: 1.25rem;  
    margin-right: 0;  
  }
`;

const LoadingDiv = styled.div`
  &::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: '\\2026'; /* ascii code for the ellipsis character */
    width: 0;
    margin-right: 1.25rem;
  }
`;

const Button: FC<ButtonProps> = ({ isLoading, children, ...rest }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingDiv>LOADING</LoadingDiv>;
    }
    return children;
  };

  return <StyledButton {...rest}>{renderContent()}</StyledButton>;
};

export { Button };

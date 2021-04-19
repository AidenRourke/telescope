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

const getPadding = (isText: boolean | undefined, size: Sizes | undefined) => {
  if (isText) return '0';
  switch (size) {
    case 'xsmall':
      return '0.5rem 1.5rem';
    case 'small':
      return '0.75rem 1.75rem';
    default:
      return '1rem 2rem';
  }
};

const getFontSize = (size: Sizes | undefined) => {
  switch (size) {
    case 'xsmall':
      return 0.5;
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
  border: 3px solid transparent;
  background-color: ${({ color }) => colors[color]};
  color: ${({ color }) => colors.getTextColor(color)};
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const OutlinedButton = styled(StyledButton)<ButtonProps>`
  border: 3px solid ${({ color }) => colors[color]};
  background-color: transparent;
  color: ${({ color }) => colors[color]};
`;

const TextButton = styled(StyledButton)<ButtonProps>`
  background-color: transparent;
  color: ${({ color }) => colors[color]};
`;

const Button: FC<ButtonProps> = ({ isLoading, isOutlined, isText, disabled, children, ...rest }) => {
  const RenderButton = (props: any) => {
    if (isOutlined) {
      return <OutlinedButton {...props} />;
    }
    if (isText) {
      return <TextButton {...props} />;
    }
    return <StyledButton {...props} />;
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loading>LOADING</Loading>;
    }
    return children;
  };

  return <RenderButton {...rest} disabled={isLoading || disabled}>{renderContent()}</RenderButton>;
};

export { Button };

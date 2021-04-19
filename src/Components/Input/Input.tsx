import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { colorTypes } from 'styles/colorTypes';
import { Sizes } from 'Types/types';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  color?: colorTypes;
  inputSize?: Sizes;
}

const getPadding = (inputSize: Sizes | undefined) => {
  switch (inputSize) {
    case 'small':
      return '0.75rem';
    default:
      return '1rem';
  }
};

const getFontSize = (inputSize: Sizes | undefined) => {
  switch (inputSize) {
    case 'small':
      return 0.75;
    default:
      return 1;
  }
};

const InputBase = styled.input<InputProps>`
  flex: 1;
  background: none;
  border: 3px solid ${({ color }) => (color ? colors[color] : colors.white)};
  color: ${colors.white};
  font-family: inherit;
  padding: ${({ inputSize }) => getPadding(inputSize)};
  font-size: ${({ inputSize }) => getFontSize(inputSize)}rem;
`;

const Input: FC<InputProps> = ({ ...rest }) => {
  return <InputBase {...rest} />;
};

export { Input };

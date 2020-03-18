import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { colorTypes } from 'styles/colorTypes';

const InputBase = styled.input<InputProps>`
  flex: 1;
  background: none;
  border: 3px solid ${({ color }) => (color ? colors[color] : colors.white)};
  padding: 1rem;
  color: ${colors.white};
  font-size: 1rem;
  font-family: inherit;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: colorTypes;
}

const Input: FC<InputProps> = ({ ...rest }) => {
  return <InputBase {...rest} />;
};

export { Input };

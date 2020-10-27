import React, { FC, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

import * as colors from 'styles/colors';

const Input = styled.input`
  font: inherit;
  font-size: 0.75rem;
  border: none;
  background-color: ${colors.white};
  color: ${colors.black};
  width: 5rem;
  padding: 0.25rem;
  margin: 0.1rem;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleSubmit: () => void;
}

const InputTag: FC<Props> = ({ handleSubmit, ...rest }) => {
  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return <Input {...rest} autoFocus onKeyUp={onKeyUp} />;
};

export { InputTag };

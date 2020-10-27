import React, { FC, useEffect, useState } from 'react';
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

interface Props {
  onSubmit: (tag: string) => void;
}

const InputTag: FC<Props> = ({ onSubmit }) => {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit(tagInputValue);
    }
  };

  return (
    <Input
      autoFocus
      onBlur={() => onSubmit(tagInputValue)}
      value={tagInputValue}
      onChange={(e: any) => setTagInputValue(e.target.value)}
      onKeyUp={onKeyUp}
    />
  );
};

export { InputTag };

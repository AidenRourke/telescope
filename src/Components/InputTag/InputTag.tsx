import React, { FC, useState } from 'react';
import styled from 'styled-components';

import * as colors from 'styles/colors';

const Input = styled.input`
  font: inherit;
  font-size: smaller;
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

  return (
    <Input
      autoFocus
      onBlur={() => onSubmit(tagInputValue)}
      value={tagInputValue}
      onChange={(e: any) => setTagInputValue(e.target.value)}
    />
  );
};

export { InputTag };

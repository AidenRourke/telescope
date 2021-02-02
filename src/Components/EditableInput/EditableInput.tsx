import React, { FC, useState } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';

const Title = styled.h1`
  cursor: pointer;
  color: ${colors.green};
`;

const Text = styled.p`
  cursor: pointer;
  color: ${colors.green};
`;

const TitleTextInput = styled.input`
  background: none;
  color: ${colors.green};
  font-family: inherit;
  font-size: 2em;
  margin-bottom: 1rem;
  width: 100%;
`;

const TextInput = styled.input`
  background: none;
  color: ${colors.green};
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
`;

interface Props {
  title?: string;
  onChange: (text: string) => void;
  type?: string;
}

const EditableInput: FC<Props> = ({ title, onChange, type }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const onBlur = async (e: any) => {
    await onChange(e.target.value);
    setEditMode(false);
  };

  if (editMode) {
    const InputComponent = type === 'h1' ? TitleTextInput : TextInput;
    return (
      <InputComponent
        autoFocus
        onBlur={onBlur}
        onFocus={(e: any) => {
          e.target.value = '';
          e.target.value = title;
        }}
      />
    );
  }

  const TextComponent = type === 'h1' ? Title : Text;

  return <TextComponent onClick={() => setEditMode(true)}>{title || 'CLICK TO ADD TEXT'}</TextComponent>;
};

export { EditableInput };

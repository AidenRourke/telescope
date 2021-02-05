import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';

const Title = styled.h1`
  cursor: pointer;
  color: ${colors.green};
  padding: 1px 2px;
  border: 2px solid transparent;
`;

const Text = styled.small`
  cursor: pointer;
  color: ${colors.green};
  padding: 1px 2px;
  border: 2px solid transparent;
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
  font-size: smaller;
  width: 100%;
`;

interface Props {
  title?: string;
  placeholder: string;
  onChange: (text: string) => void;
  type?: string;
}

const EditableInput: FC<Props> = ({ title, onChange, type, placeholder }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title || '');

  const handleSubmit = async () => {
    await onChange(value);
    setEditMode(false);
  };

  const handler = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handler);

    return () => document.removeEventListener('keyup', handler);
  });

  if (editMode) {
    const InputComponent = type === 'h1' ? TitleTextInput : TextInput;
    return (
      <InputComponent autoFocus onBlur={handleSubmit} value={value} onChange={(e: any) => setValue(e.target.value)} />
    );
  }

  const TextComponent = type === 'h1' ? Title : Text;

  return <TextComponent onClick={() => setEditMode(true)}>{title || placeholder}</TextComponent>;
};

export { EditableInput };

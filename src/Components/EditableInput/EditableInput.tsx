import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';

const Title = styled.h1`
  cursor: pointer;
  color: ${colors.green};
  padding: 1px 2px;
  border: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.small`
  cursor: pointer;
  color: ${colors.green};
  padding: 1px 2px;
  border: 2px solid transparent;
`;

const Description = styled.p`
  cursor: pointer;
  overflow: auto;
  color: ${colors.green};
  flex: 1;
  border: 2px solid transparent;
`;

const TitleInput = styled.input`
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

const TextAreaInput = styled.textarea`
  color: ${colors.green};
  resize: none;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 1em;
  flex: 1;
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
    if (editMode && e.keyCode === 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handler);

    return () => document.removeEventListener('keyup', handler);
  });

  const getInputElement = ({ ...props }) => {
    switch (type) {
      case 'h1':
        return <TitleInput autoFocus {...props} />;
      case 'textarea':
        return <TextAreaInput autoFocus {...props} />;
      default:
        return <TextInput autoFocus {...props} />;
    }
  };

  const getTextElement = ({ ...props }) => {
    const value = props.value;
    switch (type) {
      case 'h1':
        return <Title {...props}>{value}</Title>;
      case 'textarea':
        return <Description {...props}>{value}</Description>;
      default:
        return <Text {...props}>{value}</Text>;
    }
  };

  if (editMode) {
    return getInputElement({
      onBlur: handleSubmit,
      value: value,
      onChange: (e: any) => setValue(e.target.value),
    });
  }

  return getTextElement({
    onClick: () => setEditMode(true),
    value: title || placeholder,
  });
};

export { EditableInput };

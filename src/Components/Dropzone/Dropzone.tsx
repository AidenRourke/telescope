import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import * as colors from 'styles/colors';

const DropzoneContainer = styled.div<{ isDragActive: boolean }>`
  position: relative;
  flex: 1;
  cursor: pointer;
  border: 3px solid ${({ isDragActive }) => (isDragActive ? colors.blue : 'transparent')};
  &:hover {
    border: 3px solid ${colors.blue};
  }
`;

interface Props {
  onDrop: (file: File[]) => void;
  accept: string;
}

const Dropzone: FC<Props> = ({ onDrop, accept, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  return (
    <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {children}
    </DropzoneContainer>
  );
};

export { Dropzone };

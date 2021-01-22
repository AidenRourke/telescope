import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import * as colors from 'styles/colors';
import { Loading } from '../Loading';

const DropzoneContainer = styled.div<{ isDragActive: boolean }>`
  position: relative;
  flex: 1;
  cursor: pointer;
  border: 3px solid ${({ isDragActive }) => (isDragActive ? colors.blue : 'transparent')};
  &:hover {
    border: 3px solid ${colors.blue};
  }
`;

const DropZoneText = styled.small`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DropZoneLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props {
  onDrop: (file: File[]) => void;
  accept: string;
  isLoading: boolean;
}

const Dropzone: FC<Props> = ({ onDrop, accept, isLoading, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  return (
    <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {children}
      {isLoading ? (
        <DropZoneLoading>
          <Loading>
            <small>UPDATING</small>
          </Loading>
        </DropZoneLoading>
      ) : (
        <DropZoneText>EDIT COVER IMAGE</DropZoneText>
      )}
    </DropzoneContainer>
  );
};

export { Dropzone };

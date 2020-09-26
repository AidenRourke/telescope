import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onDrop: (file: File[]) => void;
}

const Dropzone: FC<Props> = ({ onDrop, children }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export { Dropzone };

import React, { FC } from 'react';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { Loading } from 'Components';

const CardThumbnail = styled.img`
  height: 10rem;
  object-fit: cover;
  border: 3px solid ${colors.blue};
  width: 100%;
  box-sizing: border-box;
`;

const CardEnabled = styled.div`
  margin: 0.5rem;
  width: 8rem;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity linear 0.15s;
  &:hover {
    opacity: 1;
  }
`;

const CardDisabled = styled.div`
  margin: 0.5rem;
  width: 8rem;
  cursor: not-allowed;
  opacity: 1;
  p {
    white-space: nowrap;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface Props {
  id: string;
  disabled?: boolean;
  loading?: boolean;
  imageSrc?: string;
  title?: string;
  onClick: (id: string) => void;
}

const Card: FC<Props> = ({ id, disabled, loading, imageSrc, title, onClick }) => {
  if (disabled || loading) {
    return (
      <CardDisabled key={id}>
        <CardThumbnail src={imageSrc} />
        {!loading ? <p title={title}>{title}</p> : <Loading>ADDING</Loading>}
      </CardDisabled>
    );
  }
  return (
    <CardEnabled key={id} onClick={() => onClick(id)}>
      <CardThumbnail src={imageSrc} />
      {!loading ? <p title={title}>{title}</p> : <Loading>ADDING</Loading>}
    </CardEnabled>
  );
};

export { Card };

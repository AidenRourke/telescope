import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons';

import * as colors from 'styles/colors';

export interface FilterType {
  type: string;
  name: string;
}

interface Props {
  filter: FilterType;
  onClick: (filter: FilterType) => void;
}

const Tag = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  font-family: inherit;
  cursor: pointer;
  color: ${colors.black};
  background-color: ${colors.green};
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  p {
    font-size: 0.75rem;
    margin-left: 0.25rem;
    margin-right: 2rem;
  }
`;

const FilterTag: FC<Props> = ({ filter, onClick }) => {
  const { name, type } = filter;

  const getIcon = () => {
    if (type === 'LOCATION') return faLocationArrow;
    else return faUser;
  };

  return (
    <Tag onClick={() => onClick(filter)}>
      <FontAwesomeIcon icon={getIcon()} size="sm" />
      <p>{name.toUpperCase()}</p>
      <FontAwesomeIcon icon={faTimes} />
    </Tag>
  );
};

export { FilterTag };

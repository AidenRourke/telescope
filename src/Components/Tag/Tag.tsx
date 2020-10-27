import React, { FC } from 'react';
import styled from 'styled-components';

import * as colors from 'styles/colors';
import { ColorTypes } from '../../Types/types';

const TagButton = styled.button<{ color: ColorTypes }>`
  font: inherit;
  border: none;
  cursor: pointer;
  background-color: ${({ color }) => colors[color]};
  color: ${({ color }) => colors.getTextColor(color)};
  padding: 0.25rem 0.5rem;
  margin: 0.1rem;
`;

const TagName = styled.small`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`;

interface Props {
  onClick: () => void;
  color: ColorTypes;
}

const Tag: FC<Props> = ({ children, onClick, ...rest }) => {
  return (
    <TagButton onClick={onClick} {...rest}>
      <TagName>{children}</TagName>
    </TagButton>
  );
};

export { Tag };

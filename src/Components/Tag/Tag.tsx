import React, { FC } from 'react';
import styled from 'styled-components';

import * as colors from 'styles/colors';

const TagButton = styled.button`
  font: inherit;
  border: none;
  cursor: pointer;
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 0.25rem;
  margin: 0.1rem;
`;

const TagName = styled.small`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  onClick: () => void;
}

const Tag: FC<Props> = ({ children, onClick, ...rest }) => {
  return (
    <TagButton onClick={onClick} {...rest}>
      <TagName>{children}</TagName>
    </TagButton>
  );
};

export { Tag };

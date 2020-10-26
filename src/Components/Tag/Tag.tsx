import React, { FC } from 'react';
import styled from 'styled-components';

import * as colors from 'styles/colors';

const TagButton = styled.button`
  font: inherit;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.red};
  color: ${colors.white};
  padding: 0.25rem;
  margin: 0.1rem;
`;

const TagName = styled.small`
  padding: 0;
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

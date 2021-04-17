import React, { FC } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';

const ellipsis = keyframes`
  to {
    width: 1.25rem;  
    margin-right: 0;  
  }
`;

const LoadingDiv = styled.div`
  font: inherit;
  &::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: '\\2026'; /* ascii code for the ellipsis character */
    width: 0;
    margin-right: 1.25rem;
  }
`;

const Loading: FC = ({ children }) => {
  return <LoadingDiv>{children}</LoadingDiv>;
};

export { Loading };

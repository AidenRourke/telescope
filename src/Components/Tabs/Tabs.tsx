import React, { ReactElement, FC, useState } from 'react';
import styled from 'styled-components';

import { Button } from 'Components/Button';

interface Props {
  children: ReactElement[];
}

const TabsContainer = styled.div`
  height: 100%;
`;

const Tab = styled(Button)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  display: block;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const TabContent = styled.div`
  margin-top: 4rem;
`;

const Tabs: FC<Props> = ({ children }) => {
  const [activeTabLabel, setActiveTabLabel] = useState<string>(children[0].props.label);

  return (
    <TabsContainer>
      <div>
        {children.map(({ props: { label } }) => (
          <Tab
            key={label}
            isActive={label === activeTabLabel}
            onClick={() => setActiveTabLabel(label)}
            color="blue"
            isText={true}
          >
            {label}
          </Tab>
        ))}
      </div>
      <TabContent>
        {children.map(child => {
          if (child.props.label === activeTabLabel) return child;
          return undefined;
        })}
      </TabContent>
    </TabsContainer>
  );
};

export { Tabs };

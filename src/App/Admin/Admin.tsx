import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar';
import styled from 'styled-components';
import * as colors from 'styles/colors';
import { Modal } from 'Components/Modal';
import { UsersModalContent } from './UsersModalContent';
import { AccountsModalContent } from './AccountsModalContent';
import { PublishersModalContent } from './PublishersModalContent';
import { GraphiqlModalContent } from './GraphiqlModalContent';

const AdminContainer = styled.div`
  padding: 2rem;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const AdminOptions = styled.div`
  margin: 2rem 0;
  width: 100%;
  flex: 1;
`;

const AdminOption = styled.button<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  font: inherit;
  color: ${colors.white};
  text-align: left;
  border: none;
  background-color: ${({ selected }) => (selected ? colors.green : 'transparent')};
`;

const OptionDetails = styled.div`
  text-align: center;
  width: 100%;
  border: 3px solid ${colors.green};
  color: ${colors.green};
  padding: 2rem 0;
`;

const Admin: FC<RouteComponentProps> = props => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const ADMIN_OPTIONS = [
    {
      name: 'WORLD USERS',
      description: 'VIEW AND CREATE WORLD USERS',
    },
    {
      name: 'PUBLISHERS',
      description: 'VIEW AND CREATE PUBLISHERS',
    },
    {
      name: 'ACCOUNTS',
      description: 'VIEW AND CREATE ACCOUNTS',
    },
  ];

  const DEVELOPMENT_ONLY_OPTIONS = [
    {
      name: 'GRAPHIQL',
      description: 'LAUNCH GRAPHIQL APPLICATION',
    },
  ];

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    DEVELOPMENT_ONLY_OPTIONS.map(option => ADMIN_OPTIONS.push(option));
  }

  const renderModalContent = () => {
    switch (ADMIN_OPTIONS[selectedOption].name) {
      case 'WORLD USERS':
        return <UsersModalContent />;
      case 'ACCOUNTS':
        return <AccountsModalContent />;
      case 'PUBLISHERS':
        return <PublishersModalContent />;
      case 'GRAPHIQL':
        return <GraphiqlModalContent />;
    }
  };

  return (
    <>
      <Navbar {...props} />
      <AdminContainer>
        <h1>SETTINGS AND OPTIONS</h1>
        <AdminOptions>
          {/*{renderHelpers()}*/}
          {ADMIN_OPTIONS.map((option, i) => (
            <AdminOption
              key={option.name}
              onMouseOver={() => setSelectedOption(i)}
              selected={selectedOption === i}
              onClick={() => setIsOpen(true)}
            >
              {option.name}
            </AdminOption>
          ))}
        </AdminOptions>
        <OptionDetails>{ADMIN_OPTIONS[selectedOption].description}</OptionDetails>
      </AdminContainer>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title={ADMIN_OPTIONS[selectedOption].name}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export { Admin };

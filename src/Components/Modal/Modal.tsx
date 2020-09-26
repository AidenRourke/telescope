import React, { FC } from 'react';
import ReactModal from 'react-modal';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const CloseModalButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: ${colors.white};
`;

interface Props {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
}

const Modal: FC<Props> = ({ isOpen, setIsOpen, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          background: 'rgb(0,0,0)',
          borderRadius: 0,
          border: `5px solid ${colors.green}`,
          position: 'relative',
          width: '50%',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <ModalContainer>
        <Header>
          <CloseModalButton onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </CloseModalButton>
        </Header>
        {children}
      </ModalContainer>
    </ReactModal>
  );
};

export { Modal };

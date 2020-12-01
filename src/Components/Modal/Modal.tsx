import React, { FC } from 'react';
import ReactModal from 'react-modal';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalProps } from 'Types/types';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    color: ${colors.blue};
  }
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

const ContentContainer = styled.div`
  max-height: 20rem;
  overflow: scroll;
`;

// ReactModal.setAppElement('#app')

const Modal: FC<ModalProps> = ({ isOpen, closeModal, title, children }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
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
          border: `5px solid ${colors.blue}`,
          position: 'relative',
          maxWidth: '50%',
          minWidth: '30rem',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <ModalContainer>
        <Header>
          <CloseModalButton onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </CloseModalButton>
        </Header>
        {title && <h1>{title}</h1>}
        <ContentContainer>{children}</ContentContainer>
      </ModalContainer>
    </ReactModal>
  );
};

export { Modal };

import React, { FC } from 'react';
import styled from 'styled-components';

import { Modal } from '../Modal';
import { ModalProps } from 'Types/types';
import { Button } from '../Button';

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 1rem;
`;

interface Props extends ModalProps {
  onConfirm: () => void;
}

const ConfirmationModal: FC<Props> = ({ title = "ARE YOU SURE?", closeModal, isOpen, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <Modal title="ARE YOU SURE?" closeModal={closeModal} isOpen={isOpen}>
      <Buttons>
        <Button color="red" onClick={handleConfirm}>
          YES
        </Button>
        <Button color="white" onClick={closeModal}>
          NO
        </Button>
      </Buttons>
    </Modal>
  );
};

export { ConfirmationModal };

import React, { FC } from 'react';
import { AccountType, ModalProps } from 'Types/types';
import { Modal } from 'Components/Modal';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  td {
    text-align: left;
    padding: 0.5rem;
  }
`;

interface Props extends ModalProps {
  curators: AccountType[];
}

const WorldCuratorsModal: FC<Props> = ({ curators, ...rest }) => {
  return (
    <Modal title="CURATORS" {...rest}>
      <Table>
        <tbody>
          {curators?.map((curator: AccountType) => (
            <tr key={curator.id}>
              <td>{curator?.user?.preferredUsername}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
};

export { WorldCuratorsModal };

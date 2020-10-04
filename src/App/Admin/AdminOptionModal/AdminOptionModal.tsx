import React, { FC, useState } from 'react';
import * as colors from 'styles/colors';
import styled from 'styled-components';
import { Button, Loading, Input } from 'Components';
import { AdminOptionType } from 'Types/types';

const UsersTable = styled.table`
  width: 100%;
  th {
    text-align: left;
  }
`;

const Error = styled.p<{ error: boolean }>`
  margin-top: 1rem;
  color: ${colors.red};
  opacity: ${({ error }) => (error ? 1 : 0)};
  height: 1.25rem;
`;

interface Props {
  adminOption: AdminOptionType;
  loading: boolean;
}

const AdminOptionModal: FC<Props> = ({ adminOption, loading }) => {
  const [error, setError] = useState();

  const renderError = () => {
    if (error) {
      if (error.includes('User already exists')) {
        return 'USER ALREADY EXISTS';
      }
      if (error.includes('User does not have a Film3D account')) {
        return 'USER DOES NOT HAVE A FILM3D ACCOUNT';
      }
      if (error.includes('Publisher already exists')) {
        return 'PUBLISHER ALREADY EXISTS';
      }
      if (error.includes('Account already exists')) {
        return 'ACCOUNT ALREADY EXISTS';
      }
      if (error.includes('Publisher does not exists')) {
        return 'PUBLISHER DOES NOT EXIST';
      }
      if (error.includes('User does not exists')) {
        return 'USER DOES NOT EXIST';
      }
    }
  };

  const renderHeaders = () => {
    return adminOption.fields.map(({ display, name }) => <th key={name}>{display}</th>);
  };

  const renderFields = () => {
    return adminOption.fields.map(({ name, type }) => {
      if (type === 'checkbox') {
        return (
          <td key={name}>
            <input name={name} type={type} />
          </td>
        );
      }
      if (type === 'text') {
        return (
          <td key={name}>
            <Input name={name} color="blue" inputSize="small" />
          </td>
        );
      }
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await adminOption.mutation(e);
      setError(null);
      e.target.reset();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>{adminOption.name}</h1>
      <form onSubmit={handleSubmit}>
        <UsersTable>
          <tbody>
            <tr>
              {renderHeaders()}
              <th>OPTION</th>
            </tr>
            <tr>
              {renderFields()}
              <td>
                {loading ? (
                  <Loading>ADDING</Loading>
                ) : (
                  <Button color="blue" isOutlined={true} size="small" type="submit">
                    ADD
                  </Button>
                )}
              </td>
            </tr>
          </tbody>
        </UsersTable>
        <Error error={!!error}>{renderError()}</Error>
      </form>
    </div>
  );
};

export { AdminOptionModal };

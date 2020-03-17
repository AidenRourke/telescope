import React, { FC } from 'react';
import styled from 'styled-components';
import { blue } from 'styles/colors';

const DataContainer = styled.div`
  color: ${blue};

  text-align: center;
  h1 {
    font-size: 4rem;
  }

  h2 {
    margin: 0;
  }
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const UserPostsData: FC = () => {
  // There will probably be an api request based on the url params to fill this up
  const mockData = [
    { name: 'posts', value: 124 },
    { name: 'countries', value: 14 },
    { name: 'users', value: 5 },
  ];
  return (
    <div>
      {mockData.map(({ name, value }) => (
        <DataContainer>
          <h1>{value}</h1>
          <h2>{name}</h2>
        </DataContainer>
      ))}
    </div>
  );
};

export { UserPostsData };

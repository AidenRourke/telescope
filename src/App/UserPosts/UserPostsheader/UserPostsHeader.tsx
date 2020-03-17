import React, { FC, useState } from 'react';
import styled from 'styled-components';

const UserPostsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
`;

const UserPostsheader: FC = () => {
  const [time, setTime] = useState<string>();

  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

  return (
    <UserPostsHeader>
      <h1>MODU WORLD</h1>
      {time}
    </UserPostsHeader>
  );
};

export { UserPostsheader };

import React, { FC } from 'react';
import { Button } from 'Components';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Warning = styled.p`
  padding-bottom: 1rem;
`;

const GraphiqlModalContent: FC = () => {
  const launchGraphiql = async () => {
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();

    window.open(`http://localhost:3001/graphiql?token=${token}`);
  };

  return (
    <Container>
      <Warning>MAKE SURE SERVER IS RUNNING LOCALLY ON PORT 3001</Warning>
      <Button onClick={launchGraphiql} color="white">
        LAUNCH GRAPHIQL
      </Button>
    </Container>
  );
};

export { GraphiqlModalContent };

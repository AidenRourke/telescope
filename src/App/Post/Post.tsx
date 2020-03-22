import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { green, white } from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';
import { Button } from 'Components/Button';

const PostContainer = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  color: ${white};
  background-color: ${green};
  padding: 2rem 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  width: 15rem;
`;

const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Modu = styled.img`
  max-width: 10rem;
`;

const BackArrow = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const SideBarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextSection = styled.section`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const TextHeader = styled.p`
  opacity: 0.7;
`;

const SideBarFooter = styled.div`
  display: inline-flex;
`

const Post: FC<RouteComponentProps> = ({ history }) => {
  return (
    <PostContainer>
      <SideBar>
        <SideBarHeader>
          <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.goBack()} />
          <Modu src={sidebar} />
        </SideBarHeader>
        <SideBarContent>
          <TextSection>
            <TextHeader>CREATED BY:</TextHeader>
            <h3>MO ALISSA</h3>
          </TextSection>
          <TextSection>
            <TextHeader>LOCATION:</TextHeader>
            <h3>MELBOURNE, AUS</h3>
          </TextSection>
          <TextSection>
            <TextHeader>FILTER:</TextHeader>
            <h3>90210</h3>
          </TextSection>
          <TextSection>
            <TextHeader>SUBMISSION DATE:</TextHeader>
            <h3>05/04/2020</h3>
          </TextSection>
          <TextSection>
            <TextHeader>TAGS:</TextHeader>
            <h3>FASHION, ART, STREETWEAR</h3>
          </TextSection>
        </SideBarContent>
        <SideBarFooter>
          <Button color="white" size="small">
            ADD TO ISSUE
          </Button>
        </SideBarFooter>
      </SideBar>
    </PostContainer>
  );
};

export { Post };

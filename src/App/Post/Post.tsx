import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';

import { green, white, blue } from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';
import { Button } from 'Components/Button';

import { useQuery } from '@apollo/react-hooks';

const PostContainer = styled.div`
  display: flex;
  flex: 1;
`;

const SideBar = styled.div`
  color: ${white};
  background-color: ${green};
  padding: 2rem 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
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
`;

const ImageContainer = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  left: 22rem;
  color: ${blue};
  padding-right: 2rem;
`;

const Image = styled.img`
  height: 80%;
`;

const Description = styled.div`
  margin-left: 2rem;
`;

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      frame1S3
      frame2S3
      frame3S3
      frame4S3
      submittedBy
      tags {
        name
      }
    }
  }
`;

const Post: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_POST, { variables: { id } });

  if (loading) return null;

  return (
    <PostContainer>
      <SideBar>
        <SideBarHeader>
          <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.push('/posts')} />
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
            <h3>{data.post.tags.map((tag: any) => tag.name).join(', ')}</h3>
          </TextSection>
        </SideBarContent>
        <SideBarFooter>
          <Button color="white">ADD TO ISSUE</Button>
        </SideBarFooter>
      </SideBar>
      <ImageContainer>
        <Image src={data.post.frame1S3} />
        <Description>
          <h1>{data.post.title}</h1>
          <p>{data.post.description}</p>
        </Description>
      </ImageContainer>
    </PostContainer>
  );
};

export { Post };

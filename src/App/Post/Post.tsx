import React, {FC, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router';
import styled from 'styled-components';
import {faArrowLeft, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useParams} from 'react-router-dom';
import {gql} from 'apollo-boost';

import {green, white, blue} from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';
import {Button} from 'Components/Button';

import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_POSTS, PostType, TagType} from "../UserPosts/ListView/ListView";

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

const SideBarFooter = styled.div``;

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
  object-fit: cover;
  height: 80%;
  width: 30%;
`;

const Description = styled.div`
  margin-left: 2rem;
`;

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      preferredUsername
      createdAt
      location
      description
      frame1S3
      frame2S3
      frame3S3
      frame4S3
      tags {
        name
      }
    }
  }
`;

const REMOVE_POST = gql`
  mutation RemovePost($postId: ID!) {
    removePost(postId: $postId) {
      post {
        id
      }
    }
  }
`;

const Post: FC<RouteComponentProps> = ({history}) => {
  const {id} = useParams();
  const [currentImage, setCurrentImage] = useState<number>(1);

  const {loading, data} = useQuery(GET_POST, {variables: {id}});
  const [removePost] = useMutation(REMOVE_POST, {
    update(cache, {data: {removePost: {post: {id}}}}) {
      const data:any = cache.readQuery({query: GET_POSTS});
      cache.writeQuery({
        query: GET_POSTS,
        data: {posts: data?.posts.filter((post: PostType) => post.id !== id.toString())}
      });
    }
  });

  const incrementImage = (currentImage: number) => {
    if (currentImage === 3) {
      return 1;
    } else {
      return currentImage + 1;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(incrementImage);
    }, 142.5);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDeletePost = (postId: string) => {
    removePost({variables: {postId}});
    history.push('/posts');
  };

  if (loading) return null;

  console.log(data);

  return (
    <PostContainer>
      <SideBar>
        <SideBarHeader>
          <BackArrow icon={faArrowLeft} size="lg" onClick={() => history.push('/posts')}/>
          <Modu src={sidebar}/>
        </SideBarHeader>
        <SideBarContent>
          <TextSection>
            <TextHeader>CREATED BY:</TextHeader>
            <h3>{data.post.preferredUsername}</h3>
          </TextSection>
          <TextSection>
            <TextHeader>LOCATION:</TextHeader>
            <h3>{data.post.location}</h3>
          </TextSection>
          <TextSection>
            <TextHeader>FILTER:</TextHeader>
            <h3>90210</h3>
          </TextSection>
          <TextSection>
            <TextHeader>SUBMISSION DATE:</TextHeader>
            <h3>{data.post.createdAt.split("T")[0]}</h3>
          </TextSection>
          <TextSection>
            <TextHeader>TAGS:</TextHeader>
            <h3>{data.post.tags.map((tag: TagType) => tag.name).join(', ')}</h3>
          </TextSection>
        </SideBarContent>
        <SideBarFooter>
          <Button color="white" size="small">
            ADD TO ISSUE
          </Button>
          <Button color="red" size="small" onClick={() => handleDeletePost(data.post.id)}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg"/>
          </Button>
        </SideBarFooter>
      </SideBar>
      <ImageContainer>
        <Image src={data.post[`frame${currentImage}S3`]}/>
        <Description>
          <h1>{data.post.title}</h1>
          <p>{data.post.description}</p>
        </Description>
      </ImageContainer>
    </PostContainer>
  );
};

export {Post};

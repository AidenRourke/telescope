import React, { FC, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { faArrowLeft, faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { green, white, blue } from 'styles/colors';
import sidebar from 'assets/SIDEBAR.png';
import { Button, Modal, Tag, InputTag } from 'Components';
import { Film3d } from './Film3d';
import { AddToWorld } from './AddToWorld';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { FilterType, TagType } from 'Types/types';
import { FilterContext } from '../../Contexts/FilterContext';
import * as colors from 'styles/colors';

const PostContainer = styled.div`
  display: flex;
  flex: 1;
`;

const SideBar = styled.div`
  color: ${white};
  background-color: ${green};
  padding: 2rem 5rem 2rem 2rem;
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

const TextInfoButton = styled(Button)`
  &:hover {
    color: ${colors.black};
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

const SideBarFooter = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  left: 23rem;
  color: ${blue};
  padding-right: 2rem;
`;

const Description = styled.div`
  margin-left: 2rem;
`;

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      latitude
      preferredUsername
      createdAt
      city
      countryCode
      description
      frame1S3
      frame2S3
      frame3S3
      frame4S3
      tags {
        id
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

const CREATE_POST_TAG = gql`
  mutation CreatePostTag($postId: ID!, $tagName: String!) {
    createPostTag(postId: $postId, tagName: $tagName) {
      post {
        id
        tags {
          id
          name
        }
      }
    }
  }
`;

const REMOVE_POST_TAG = gql`
  mutation RemovePostTag($postId: ID!, $tagId: ID!) {
    removePostTag(postId: $postId, tagId: $tagId) {
      post {
        id
        tags {
          id
          name
        }
      }
    }
  }
`;

const Post: FC<RouteComponentProps> = ({ history }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [isRemovingTag, setIsRemovingTag] = useState<boolean>(false);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const { addFilter } = useContext(FilterContext);

  const { loading, data } = useQuery(GET_POST, { variables: { id } });

  const [removePost] = useMutation(REMOVE_POST);

  const [createPostTag] = useMutation(CREATE_POST_TAG);

  const [removePostTag] = useMutation(REMOVE_POST_TAG);

  const handleDeletePost = async (postId: string) => {
    await removePost({ variables: { postId } });
    history.push({ pathname: `/posts`, search: window.location.search });
  };

  if (loading) return null;

  const renderLocation = () => {
    if (data.post.city && data.post.countryCode)
      return `${data.post.city.toUpperCase()}, ${data.post.countryCode.toUpperCase()}`;
    return 'UNKNOWN';
  };

  const handleAddTag = async () => {
    if (tagInputValue.length > 0) {
      await createPostTag({
        variables: {
          postId: data.post.id,
          tagName: tagInputValue,
        },
      });
      setTagInputValue('');
    }
  };

  const renderAddTag = () => {
    if (!isAddingTag) {
      return (
        <Tag onClick={() => setIsAddingTag(true)} color="white">
          <FontAwesomeIcon icon={faPlus} size="sm" />
        </Tag>
      );
    }
    return (
      <>
        <InputTag
          value={tagInputValue}
          onChange={(e: any) => setTagInputValue(e.target.value)}
          handleSubmit={handleAddTag}
          onBlur={() => setIsAddingTag(false)}
        />
        <Tag onClick={() => setIsAddingTag(false)} color="white">
          CANCEL
        </Tag>
      </>
    );
  };

  const renderRemoveTag = () => {
    if (data.post.tags.length === 0) return;

    if (!isRemovingTag) {
      return (
        <Tag onClick={() => setIsRemovingTag(true)} color="white">
          <FontAwesomeIcon icon={faMinus} size="sm" />
        </Tag>
      );
    }
    return (
      <Tag onClick={() => setIsRemovingTag(false)} color="white">
        CANCEL
      </Tag>
    );
  };

  const handleAddFilter = (filter: FilterType) => {
    addFilter(filter);
    history.push({ pathname: `/posts`, search: window.location.search });
  };

  const handleTagClick = async (tag: TagType) => {
    if (isRemovingTag) {
      const ret = await removePostTag({ variables: { postId: data.post.id, tagId: tag.id } });
      const {
        data: {
          removePostTag: {
            post: { tags },
          },
        },
      } = ret;
      if (tags.length === 0) setIsRemovingTag(false);
    } else {
      handleAddFilter({ name: tag.name, type: 'TAG' });
    }
  };

  return (
    <>
      <PostContainer>
        <SideBar>
          <SideBarHeader>
            <BackArrow
              icon={faArrowLeft}
              size="lg"
              onClick={() => history.push({ pathname: '/posts', search: window.location.search })}
            />
            <Modu src={sidebar} />
          </SideBarHeader>
          <SideBarContent>
            <TextSection>
              <TextHeader>CREATED BY:</TextHeader>
              <TextInfoButton
                isText={true}
                color="white"
                onClick={() => handleAddFilter({ name: data.post.preferredUsername, type: 'USER' })}
              >
                <h3>{data.post.preferredUsername.toUpperCase()}</h3>
              </TextInfoButton>
            </TextSection>
            <TextSection>
              <TextHeader>LOCATION:</TextHeader>
              <h3>{renderLocation()}</h3>
            </TextSection>
            <TextSection>
              <TextHeader>FILTER:</TextHeader>
              <h3>90210</h3>
            </TextSection>
            <TextSection>
              <TextHeader>SUBMISSION DATE:</TextHeader>
              <h3>{data.post.createdAt.split('T')[0]}</h3>
            </TextSection>
            <TextSection>
              <TextHeader>TAGS:</TextHeader>
              <h3>
                <Tags>
                  {data.post.tags.map((tag: TagType) => (
                    <Tag key={tag.id} onClick={() => handleTagClick(tag)} color={isRemovingTag ? 'red' : 'white'}>
                      {tag.name.toUpperCase()}
                    </Tag>
                  ))}
                  {!isRemovingTag && renderAddTag()}
                  {!isAddingTag && renderRemoveTag()}
                </Tags>
              </h3>
            </TextSection>
          </SideBarContent>
          <SideBarFooter>
            <Button color="white" size="small" onClick={() => setIsOpen(true)}>
              ADD TO WORLD
            </Button>
            <Button color="red" size="small" onClick={() => handleDeletePost(data.post.id)}>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" />
            </Button>
          </SideBarFooter>
        </SideBar>
        <ImageContainer>
          <Film3d images={[data.post.frame1S3, data.post.frame2S3, data.post.frame3S3, data.post.frame4S3]} />
          <Description>
            <h1>{data.post.title}</h1>
            <p>{data.post.description}</p>
          </Description>
        </ImageContainer>
      </PostContainer>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="ADD TO WORLD">
        <AddToWorld postId={data.post.id} />
      </Modal>
    </>
  );
};

export { Post };

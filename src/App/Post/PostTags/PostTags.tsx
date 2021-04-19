import React, { FC, useState } from 'react';
import { FilterType, TagType } from 'Types/types';
import { Tag, InputTag } from 'Components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Tags = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

const CREATE_POST_TAG = gql`
  mutation CreatePostTag($postId: ID!, $tagName: String!) {
    createPostTag(postId: $postId, tagName: $tagName) {
      postTag {
        id
        post {
          id
          tags {
            id
            name
          }
        }
      }
    }
  }
`;

const REMOVE_POST_TAG = gql`
  mutation RemovePostTag($postId: ID!, $tagId: ID!) {
    removePostTag(postId: $postId, tagId: $tagId) {
      postTag {
        id
        post {
          id
          tags {
            id
            name
          }
        }
      }
    }
  }
`;

interface Props {
  tags: TagType[];
  handleAddFilter: (filter: FilterType) => void;
  postId: string;
}

const PostTags: FC<Props> = ({ tags, handleAddFilter, postId }) => {
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [isRemovingTag, setIsRemovingTag] = useState<boolean>(false);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const [createPostTag] = useMutation(CREATE_POST_TAG);

  const [removePostTag] = useMutation(REMOVE_POST_TAG);

  const handleAddTag = async () => {
    if (tagInputValue.length > 0) {
      await createPostTag({
        variables: {
          postId,
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
    if (tags.length === 0) return;

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

  const handleTagClick = async (tag: TagType) => {
    if (isRemovingTag) {
      const ret = await removePostTag({ variables: { postId, tagId: tag.id } });
      const {
        data: {
          removePostTag: {
            postTag: {
              post: { tags },
            },
          },
        },
      } = ret;
      if (tags.length === 0) setIsRemovingTag(false);
    } else {
      handleAddFilter({ name: tag.name, type: 'TAG' });
    }
  };

  return (
    <Tags>
      {tags.map((tag: TagType) => (
        <Tag key={tag.id} onClick={() => handleTagClick(tag)} color={isRemovingTag ? 'red' : 'white'}>
          {tag.name.toUpperCase()}
        </Tag>
      ))}
      {!isRemovingTag && renderAddTag()}
      {!isAddingTag && renderRemoveTag()}
    </Tags>
  );
};

export { PostTags };

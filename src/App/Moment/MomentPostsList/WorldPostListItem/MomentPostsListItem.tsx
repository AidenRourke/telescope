import React, { FC, useRef } from 'react';
import { MomentPostType } from 'Types/types';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import styled from 'styled-components';
import { DragItem } from 'Types/types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import * as colors from 'styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { EditableInput, Loading } from 'Components';
import { useHistory, useLocation } from 'react-router';

const WorldPostsListItemContainer = styled.div<{ isDragging: boolean }>`
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: ${({ isDragging }) => isDragging && 0};
`;

const PostInformation = styled.div`
  flex: 1;
`;

const WorldPostImage = styled.img`
  object-fit: cover;
  width: 3rem;
  height: 5rem;
  border: 2px solid white;
  margin-right: 1rem;
`;

const Title = styled.p`
  color: ${colors.green};
`;

const Author = styled.p`
  color: ${colors.blue};
`;

const RemovePostButton = styled.button`
  margin-left: 0.5rem;
  color: ${colors.red};
  cursor: pointer;
  background: none;
  border: none;
`;

const EditableInputDiv = styled.div`
  width: 15rem;
`;

const REMOVE_MOMENT_POST = gql`
  mutation RemoveMomentPost($momentPostId: ID!) {
    removeMomentPost(momentPostId: $momentPostId) {
      momentPost {
        moment {
          id
          momentPosts {
            id
          }
        }
      }
    }
  }
`;

const UPDATE_MOMENT_POST_CATEGORY = gql`
  mutation UpdateMomentPostCategory($momentPostId: ID!, $category: String!) {
    updateMomentPostCategory(momentPostId: $momentPostId, category: $category) {
      momentPost {
        id
        category
      }
    }
  }
`;

interface Props {
  momentPost: MomentPostType;
  index: number;
  updatePost: (dragIndex: number, dropIndex: number) => void;
  movePost: (dragIndex: number, hoverIndex: number) => void;
}

const MomentPostsListItem: FC<Props> = ({ momentPost, index, updatePost, movePost }) => {
  const momentPostId = momentPost.id;
  const post = momentPost.post;

  const ref = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const { search } = useLocation();

  const [removeMomentPost, { loading: isRemoving }] = useMutation(REMOVE_MOMENT_POST);
  const [updateMomentPostCategory] = useMutation(UPDATE_MOMENT_POST_CATEGORY);

  const dropFunction = (
    item: DragItem,
    monitor: DropTargetMonitor,
    handler: (dragIndex: number, hoverIndex: number) => void,
  ) => {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = ref.current?.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    handler(dragIndex, hoverIndex);

    item.index = hoverIndex;
  };

  const [, drop] = useDrop({
    accept: 'post',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      dropFunction(item, monitor, movePost);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'post', id: post.id, index, originalIndex: index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { index, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (didDrop && dropResult) {
        updatePost(index, dropResult.index);
      } else {
        movePost(index, originalIndex);
      }
    },
  });

  drag(drop(ref));

  const handleDelete = () => {
    removeMomentPost({
      variables: {
        momentPostId,
      },
    });
  };

  const changeCategory = async (category: string) => {
    if (category !== momentPost.category) {
      await updateMomentPostCategory({
        variables: {
          momentPostId,
          category,
        },
      });
    }
  };

  return (
    <WorldPostsListItemContainer ref={ref} isDragging={isDragging}>
      <WorldPostImage src={post.frame1S3} onClick={() => history.push({ pathname: `/posts/${post.id}`, search })} />
      {isRemoving ? (
        <PostInformation>
          <Loading>
            <small>REMOVING</small>
          </Loading>
        </PostInformation>
      ) : (
        <>
          <PostInformation>
            <Title>{post.title}</Title>
            <Author>{post.user?.preferredUsername}</Author>
          </PostInformation>
          <EditableInputDiv>
            <EditableInput type="p" title={momentPost.category} onChange={changeCategory} placeholder="SET CATEGORY" />
          </EditableInputDiv>
        </>
      )}
      <RemovePostButton onClick={handleDelete}>
        <FontAwesomeIcon icon={faMinus} size="lg" />
      </RemovePostButton>
    </WorldPostsListItemContainer>
  );
};

export { MomentPostsListItem };

import React, { FC, useRef } from 'react';
import { PostType } from 'Types/types';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import styled from 'styled-components';
import { DragItem } from 'Types/types';

const WorldPostsListItemContainer = styled.div`
  margin-bottom: 0.5rem;
  cursor: move;
  display: flex;
  align-items: center;
`;

const WorldPostImage = styled.img`
  object-fit: cover;
  width: 3rem;
  height: 5rem;
  border: 2px solid white;
  margin-right: 1rem;
`;

interface Props {
  post: PostType;
  index: number;
  movePost: (dragIndex: number, hoverIndex: number) => void;
}

const WorldPostsListItem: FC<Props> = ({ post, index, movePost }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'post',
    drop(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      movePost(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'post', id: post.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <WorldPostsListItemContainer ref={ref}>
      <WorldPostImage src={post.frame1S3} />
      <div>
        <p>{post.title}</p>
        <p>{post.preferredUsername}</p>
      </div>
    </WorldPostsListItemContainer>
  );
};

export { WorldPostsListItem };

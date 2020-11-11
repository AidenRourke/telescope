import React, { FC } from 'react';
import { Button, Loading } from 'Components';
import { PublisherType } from 'Types/types';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface Props {
  publisher: PublisherType;
}

const REMOVE_PUBLISHER = gql`
  mutation RemovePublisher($publisherId: ID!) {
    removePublisher(publisherId: $publisherId) {
      publisher {
        id
      }
    }
  }
`;

const AdminPublisherRow: FC<Props> = ({ publisher }) => {
  const [removePublisher, { loading }] = useMutation(REMOVE_PUBLISHER, {
    refetchQueries: ['GetPublishers'],
    awaitRefetchQueries: true,
  });

  const handleRemovePublisher = async () => {
    await removePublisher({
      variables: {
        publisherId: publisher.id,
      },
    });
  };

  return (
    <tr>
      <td>{publisher.name}</td>
      <td>{publisher.organizationFlag?.toString()}</td>
      <td>
        {loading ? (
          <Loading>REMOVING</Loading>
        ) : (
          <Button color="red" isOutlined={true} size="small" onClick={handleRemovePublisher}>
            REMOVE
          </Button>
        )}
      </td>
    </tr>
  );
};

export { AdminPublisherRow };

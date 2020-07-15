import React, { Fragment } from 'react';
import {
  ListGroupItem,
  Button,
  Badge,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import ItemEditModal from './ItemEditModal';

const CustomListGroupItem = ({ _id, isAuthenticated, rating, description, name, newEpisode, seenEpisodes, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(_id)
  }

  return (
    <ListGroupItem>
      <ListGroupItemHeading>
        {isAuthenticated ? (
          <Fragment>
            <Button
              className='remove-btn'
              color='danger'
              size='sm'
              onClick={handleDelete}
            >
              &times;
            </Button>
            <ItemEditModal
              _id={_id}
              name={name}
              rating={rating}
              description={description}
              newEpisode={newEpisode}
            />
          </Fragment>
        ) : null}
        {name} <Badge pill>{rating}</Badge>
      </ListGroupItemHeading>
      <ListGroupItemText>
        {description}
        <br />
        Airing on: {newEpisode}
        <br />
        No. of watched episodes: {seenEpisodes}
        <Badge />
      </ListGroupItemText>
    </ListGroupItem>
  );
}

export default CustomListGroupItem;

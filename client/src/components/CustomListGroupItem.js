import React, { Component, Fragment } from 'react';
import {
  ListGroupItem,
  Button,
  Badge,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import ItemEditModal from './ItemEditModal';

class CustomListGroupItem extends Component {
  onDeleteClick = id => {
    this.props.deleteItem(this.props._id);
  };

  render() {
    return (
      <ListGroupItem>
        <ListGroupItemHeading>
          {this.props.isAuthenticated ? (
            <Fragment>
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={this.onDeleteClick.bind(this, this.props._id)}
              >
                &times;
              </Button>
              <ItemEditModal
                _id={this.props._id}
                name={this.props.name}
                rating={this.props.rating}
                description={this.props.description}
                newEpisode={this.props.newEpisode}
              />
            </Fragment>
          ) : null}
          {this.props.name} <Badge pill>{this.props.rating}</Badge>
        </ListGroupItemHeading>
        <ListGroupItemText>
          {this.props.description}
          <br />
          Airing on: {this.props.newEpisode}
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

export default CustomListGroupItem;

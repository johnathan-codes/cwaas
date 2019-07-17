import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { daysOfWeek } from './DaysOfWeek';
const animatedComponents = makeAnimated();

class ShoppingList extends Component {
  state = {
    selectedOption: {
      value: 'Monday',
      label: 'Monday'
    }
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  };

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { selectedOption } = this.state;
    const { items } = this.props.item;

    if (items.length > 0 && selectedOption.value === 'All') {
      return (
        <Container>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={daysOfWeek}
          />
          <ListGroup>
            <TransitionGroup className='shopping-list'>
              {items.map(({ _id, name, rating, description, newEpisode }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      {this.props.isAuthenticated ? (
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                      ) : null}
                      {name} <Badge pill>{rating}</Badge>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      {description}
                      <br />
                      Airing on: {newEpisode}
                    </ListGroupItemText>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      );
    } else {
      return (
        <Container>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={daysOfWeek}
          />
          <ListGroup>
            <TransitionGroup className='shopping-list'>
              {items.map(({ _id, name, rating, description, newEpisode }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  {items.length > 0 ? (
                    <div>
                      {newEpisode === selectedOption.value ? (
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            {this.props.isAuthenticated ? (
                              <Button
                                className='remove-btn'
                                color='danger'
                                size='sm'
                                onClick={this.onDeleteClick.bind(this, _id)}
                              >
                                &times;
                              </Button>
                            ) : null}
                            {name}
                            <Badge pill>{rating}</Badge>
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            {description} <br />
                            Airing on: {newEpisode}
                          </ListGroupItemText>
                        </ListGroupItem>
                      ) : null}
                    </div>
                  ) : (
                    <ListGroupItem>
                      <ListGroupItemHeading>
                        {this.props.isAuthenticated ? (
                          <Button
                            className='remove-btn'
                            color='danger'
                            size='sm'
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >
                            &times;
                          </Button>
                        ) : null}
                        {name} <Badge pill>{rating}</Badge>
                      </ListGroupItemHeading>
                      <ListGroupItemText>
                        {description} <br />
                        Airing on: {newEpisode}
                      </ListGroupItemText>
                    </ListGroupItem>
                  )}
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);

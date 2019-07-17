import React, { Component } from 'react';
import { Container, ListGroup } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import CustomListGroupItem from './CustomListGroupItem';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { daysOfWeek } from './DaysOfWeek';
const animatedComponents = makeAnimated();

class ShoppingList extends Component {
  state = {
    selectedOption: {
      value: 'All',
      label: 'All'
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
              {items.map(
                ({
                  _id,
                  name,
                  rating,
                  description,
                  newEpisode,
                  seenEpisodes
                }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>
                    <CustomListGroupItem
                      _id={_id}
                      name={name}
                      rating={rating}
                      description={description}
                      newEpisode={newEpisode}
                      seenEpisodes={seenEpisodes}
                      isAuthenticated={this.props.isAuthenticated}
                      deleteItem={this.props.deleteItem}
                    />
                  </CSSTransition>
                )
              )}
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
              {items.map(
                ({
                  _id,
                  name,
                  rating,
                  description,
                  newEpisode,
                  seenEpisodes
                }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>
                    {items.length > 0 ? (
                      <div>
                        {newEpisode === selectedOption.value ? (
                          <CustomListGroupItem
                            _id={_id}
                            name={name}
                            rating={rating}
                            description={description}
                            newEpisode={newEpisode}
                            seenEpisodes={seenEpisodes}
                            isAuthenticated={this.props.isAuthenticated}
                            deleteItem={this.props.deleteItem}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <CustomListGroupItem
                        _id={_id}
                        name={name}
                        rating={rating}
                        description={description}
                        newEpisode={newEpisode}
                        seenEpisodes={seenEpisodes}
                        isAuthenticated={this.props.isAuthenticated}
                        deleteItem={this.props.deleteItem}
                      />
                    )}
                  </CSSTransition>
                )
              )}
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

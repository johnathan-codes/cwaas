import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import axios from 'axios';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    rating: '',
    description: '',
    newEpisode: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  async componentDidMount() {
    try {
      const updateItem = await axios(`/api/items/${this.props._id}`);
      const { name, rating, description, newEpisode } = updateItem.data.item;
      this.setState({ name, rating, description, newEpisode });
    } catch (err) {
      console.log(err);
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal //set state to whatever it is not
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      rating: this.state.rating,
      description: this.state.description,
      newEpisode: this.state.newEpisode
    };

    this.props.addItem(newItem);
    this.props.deleteItem(this.props._id);
    this.toggle();
  };

  render() {
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Button color='primary' onClick={this.toggle} size='sm'>
            Edit
          </Button>
        ) : (
          <Fragment />
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit to list</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name='rating'
                  id='rating'
                  value={this.state.rating}
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name='description'
                  id='description'
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name='newEpisode'
                  id='newEpisode'
                  value={this.state.newEpisode}
                  onChange={this.onChange}
                />
                <Button color='primary' style={{ marginTop: '2rem' }} block>
                  Edit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem, deleteItem }
)(ItemModal);

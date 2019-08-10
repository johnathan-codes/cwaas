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
import { updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import axios from 'axios';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    rating: '',
    description: '',
    newEpisode: '',
    seenEpisodes: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  async componentDidMount() {
    try {
      const updateItem = await axios(`/api/items/${this.props._id}`);
      const {
        name,
        rating,
        description,
        newEpisode,
        seenEpisodes
      } = updateItem.data.item;
      this.setState({ name, rating, description, newEpisode, seenEpisodes });
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

    const id = this.props._id;
    const item = {
      name: this.state.name,
      rating: this.state.rating,
      description: this.state.description,
      newEpisode: this.state.newEpisode,
      seenEpisodes: this.state.seenEpisodes
    };

    this.props.updateItem(id, item);
    this.toggle();
  };

  render() {
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Button color="primary" onClick={this.toggle} size="sm">
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
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="rating"
                  id="rating"
                  value={this.state.rating}
                  onChange={this.onChange}
                />
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="newEpisode"
                  id="newEpisode"
                  value={this.state.newEpisode}
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="seenEpisodes"
                  id="seenEpisodes"
                  value={this.state.seenEpisodes}
                  onChange={this.onChange}
                />
                <Button color="primary" style={{ marginTop: '2rem' }} block>
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
  { updateItem }
)(ItemModal);

import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { daysOfWeekOnly } from './DaysOfWeek';
const animatedComponents = makeAnimated();

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    rating: '',
    description: '',
    seenEpisodes: '',
    selectedOption: {
      value: '',
      label: ''
    },
    alertRating: false,
    alertEpisodes: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal //set state to whatever it is not
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeValidate = e => {
    if (e.target.value > 10 || e.target.value < 1) {
      this.setState({ alertRating: true });
      return;
    } else if (this.state.alertRating) {
      this.setState({ alertRating: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeValidateEpisodes = e => {
    if (e.target.value < 1) {
      this.setState({ alertEpisodes: true });
      return;
    } else if (this.state.alertEpisodes) {
      this.setState({ alertEpisodes: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeSelect = selectedOption => {
    this.setState({ selectedOption });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      rating: this.state.rating,
      description: this.state.description,
      newEpisode: this.state.selectedOption.value,
      seenEpisodes: this.state.seenEpisodes
    };

    this.props.addItem(newItem);

    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Login to add/delete an item</h4>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to list</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Name of the show"
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="rating"
                  id="rating"
                  placeholder="Rating"
                  value={this.state.rating}
                  onChange={this.onChangeValidate}
                />
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                />
                <Select
                  value={this.state.selectedOption}
                  onChange={this.onChangeSelect}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={daysOfWeekOnly}
                />
                <Input
                  type="number"
                  name="seenEpisodes"
                  id="seenEpisodes"
                  placeholder="Episodes seen"
                  onChange={this.onChangeValidateEpisodes}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
            <Alert color="danger" isOpen={this.state.alertRating}>
              Rating value must be within 1-10!
            </Alert>
            <Alert color="danger" isOpen={this.state.alertEpisodes}>
              How can you watch a negative number of episodes?
            </Alert>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);

import React, { Component, Fragment } from 'react';
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
import { updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import axios from 'axios';
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
      this.setState({
        name: name,
        rating: rating,
        description: description,
        selectedOption: {
          value: newEpisode,
          label: newEpisode
        },
        seenEpisodes: seenEpisodes
      });
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
    if (e.target.value < 0) {
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

    const id = this.props._id;
    const item = {
      name: this.state.name,
      rating: this.state.rating,
      description: this.state.description,
      newEpisode: this.state.selectedOption.value,
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
          <ModalHeader toggle={this.toggle}>Edit item</ModalHeader>
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
                  onChange={this.onChangeValidate}
                />
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.description}
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
                  value={this.state.seenEpisodes}
                  onChange={this.onChangeValidateEpisodes}
                />
                <Button color="primary" style={{ marginTop: '2rem' }} block>
                  Edit
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

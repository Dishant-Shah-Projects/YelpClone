import React, { Component } from "react";
import Rating from "react-rating";
import cookie from "react-cookies";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button } from "react-bootstrap";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class RatingReview extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      rating: null,
      customer: ownprops.userInfo,
      restaurant: ownprops.restaurantemail,
    };
    this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
    this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
    this.submitreview = this.submitreview.bind(this);
  }
  ratingChangeHandler = (value) => {
    this.setState({
      rating: value,
    });
  };
  reviewChangeHandler = (e) => {
    this.setState({
      review: e.target.value,
    });
  };
  submitreview = () => {
    const data = {
      Rating: this.state.rating,
      Review: this.state.review,
      customerID: this.state.customer.customerID,
      restaurantID: this.state.restaurant.restaurantID,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/customer/restaurantRatingsAdd", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          rating: "",
          review: "",
        });
      });
  };

  render() {
    return (
      <>
        <Form>
          <Form.Group as={Row}>
            <Form.Label>Rating</Form.Label>
            <Rating onChange={this.ratingChangeHandler} />
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Review</Form.Label>
            <textarea onChange={this.reviewChangeHandler}></textarea>
          </Form.Group>
          <Form.Group as={Row}>
            <Button onClick={this.submitreview}>Submit Review</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.profilereducer.profileinfo);
  const userInfo = state.profilereducer.profileinfo;
  return {
    userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (payload) => {
      dispatch({
        type: profile,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RatingReview);

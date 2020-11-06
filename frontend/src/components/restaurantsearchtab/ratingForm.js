import React, { Component } from "react";
import Rating from "react-rating";
import cookie from "react-cookies";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button } from "react-bootstrap";
import { backendURL } from "../../config";
class RatingReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      customer: cookie.load("user"),
      restaurant: props.restaurantemail,
    };
    this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
    this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
    this.submitreview = this.submitreview.bind(this);
  }
  ratingChangeHandler = (value) => {
    console.log(value);
    this.setState({
      rating: value,
    });
  };
  reviewChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      review: e.target.value,
    });
  };
  submitreview = () => {
    const data = {
      rating: this.state.rating,
      review: this.state.review,
      customer: this.state.customer,
      restaurant: this.state.restaurant,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/restaurantRatingsAdd", data)

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
export default RatingReview;

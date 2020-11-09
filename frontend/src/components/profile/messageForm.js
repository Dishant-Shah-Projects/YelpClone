import React, { Component } from "react";
import Rating from "react-rating";
import cookie from "react-cookies";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button } from "react-bootstrap";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class MessageForm extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      rating: null,
      user: ownprops.userInfo,
      customer: ownprops.customer,
    };
    console.log(this.state.user);
    console.log(this.state.customer);
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
      restaurantID: this.state.user.restaurantID,
      restaurantName: this.state.user.Name,
      customerName:
        this.state.customer.FirstName + " " + this.state.customer.LastName,
      Messager: "restaurant",
      Message: this.state.review,
      customerID: this.state.customer.customerID,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    console.log(data);
    axios
      .post(backendURL + "/restaurant/messageSend", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Registered: true,
          });
        } else {
          this.setState({
            Registered: false,
          });
        }
      });
    return false;
  };

  render() {
    if (this.state.Registered) {
      return <h2>Please go to the meesage tab to continue conversation</h2>;
    }
    return (
      <>
        <Form>
          <Form.Group as={Row}>
            <Form.Label>Send Message</Form.Label>
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
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);

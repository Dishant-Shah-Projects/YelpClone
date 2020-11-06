import React, { Component } from "react";
import "../../App.css";
import { Container, Card } from "react-bootstrap";

import axios from "axios";
import Rating from "react-rating";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant,
      Reviews: [],
    };
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      restaurantID: this.state.restaurant,
      PageNo:0
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"restaurant/reviews", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Reviews: response.data,
        });
      });
  }

  render() {
    let eventsdisp = null;
    if (this.state.Reviews !== []) {
      eventsdisp = this.state.Reviews.map((eve) => {
        console.log(this.state.restaurant);
        return (
          <React.Fragment>
            <Card>
              <Card.Title>{eve.CustomerName}</Card.Title>
              <Rating initialRating={eve.Rating} />
              <Card.Body>{eve.Review}</Card.Body>
            </Card>
          </React.Fragment>
        );
      });
    }

    return (
      <Container>
        <h1>Reviews</h1>
        {eventsdisp}
      </Container>
    );
  }
}
export default Reviews;

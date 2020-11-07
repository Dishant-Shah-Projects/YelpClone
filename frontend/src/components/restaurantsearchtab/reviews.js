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
    console.log(props.restaurant);
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    if (prevProps.restaurant !== this.props.restaurant) {
      this.setState({
        restaurant: this.props.restaurant,
        Reviews:this.props.restaurant.Reviews
      });
    }
  }
  render() {
    let eventsdisp = null;
    if (this.state.Reviews !== []) {
      eventsdisp = this.state.Reviews.map((eve) => {
        console.log(this.state.restaurant);
        return (
          <React.Fragment>
            <Card>
              <Card.Title>{eve.customerName}</Card.Title>
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

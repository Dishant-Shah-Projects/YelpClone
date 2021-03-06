import React, { Component } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Row, Button } from "react-bootstrap";
import cookie from "react-cookies";
import { backendURL } from "../../config";
class RestaurantPickUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      restaurant: cookie.load("user"),
      //restaurant:props.restaurantemail
    };
    this.onFileChange = this.onFileChange.bind(this);

    this.submitreview = this.submitreview.bind(this);
  }
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  submitreview = () => {
    const formData = new FormData();
    formData.append(
      "profileImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("restaurant", this.state.restaurant);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/profilepictureupload", formData)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
      });
  };

  render() {
    return (
      <>
        <Card style={{ width: "20rem" }}>
          <Form>
            <Form.Group as={Row}>
              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={this.onFileChange}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Button onClick={this.submitreview}>Submit Picture</Button>
            </Form.Group>
          </Form>
        </Card>
      </>
    );
  }
}
export default RestaurantPickUpload;

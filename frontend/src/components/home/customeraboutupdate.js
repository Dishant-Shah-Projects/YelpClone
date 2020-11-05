import React, { Component } from "react";
import "../../App.css";
// import cookie from 'react-cookies';
import axios from "axios";
import { Redirect } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Form,
  Row,
  FormGroup,
  FormLabel,
  Button,
  Image,
} from "react-bootstrap";
import cookie from "react-cookies";

class ProfileUpdate extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
      err: "",
      userEmail: cookie.load("user"),

      authFlag: false,
    };

    this.findmeinChangeHandler = this.findmeinChangeHandler.bind(this);
    this.thingsiloveChangeHandler = this.thingsiloveChangeHandler.bind(this);
    this.yelpingsinceChangeHandler = this.yelpingsinceChangeHandler.bind(this);

    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
    var headers = new Headers();
    const data = {
      userEmail: this.state.userEmail,
    };
  }

  findmeinChangeHandler = (e) => {
    this.setState({
      findmein: e.target.value,
    });
  };
  thingsiloveChangeHandler = (e) => {
    this.setState({
      thingsilove: e.target.value,
    });
  };
  yelpingsinceChangeHandler = (e) => {
    this.setState({
      yelpingsince: e.target.value,
    });
  };

  submit = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      userEmail: this.state.userEmail,
      yelpingsince: this.state.yelpingsince,
      thingsilove: this.state.thingsilove,
      findmein: this.state.findmein,
    };

    console.log(this.state);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/aboutupdate", data).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true,
        });
      } else {
        this.setState({
          authFlag: false,
        });
      }
    });
  };

  render() {
    return (
      <>
        <br />
        <Form>
          <Form.Label>Update Information</Form.Label>

          <Form.Label>Yelping Since</Form.Label>
          <Form.Control
            type="text"
            placeholder="Yelping Since"
            onChange={this.yelpingsinceChangeHandler}
          />
          <Form.Label>Things I Love</Form.Label>
          <Form.Control
            type="text"
            placeholder="Things I Love"
            onChange={this.thingsiloveChangeHandler}
          />
          <Form.Label>Find Me In</Form.Label>
          <Form.Control
            type="text"
            placeholder="Find me in"
            onChange={this.findmeinChangeHandler}
          />
          <Button variant="primary" type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default ProfileUpdate;

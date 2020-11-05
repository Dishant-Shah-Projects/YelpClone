import React, { Component } from "react";
import "../../App.css";
// import cookie from 'react-cookies';
import axios from "axios";
import { Redirect } from "react-router";
import { Container } from "react-bootstrap";

class RestaurantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      location: "",
      dispform: null,
      authFlag: false,
    };
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.userofint = this.userofint.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  userofint = (e) => {};
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submit = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/restaurantsignup", data)
      .then((response) => {
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
    if (this.state.authFlag) {
      return <Redirect to="/restlogin" />;
    }
    return (
      <Container>
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Signup</h2>
              <p>Please select your purpose</p>
            </div>
            <div className="form-group"></div>

            <div className="form-group">
              <input
                onChange={this.nameChangeHandler}
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            {this.state.usererr && (
              <div className="alert alert-danger">{this.state.usererr}</div>
            )}

            <div className="form-group">
              <input
                onChange={this.emailChangeHandler}
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            {this.state.usererr && (
              <div className="alert alert-danger">{this.state.usererr}</div>
            )}

            <div className="form-group">
              <input
                onChange={this.passwordChangeHandler}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            {this.state.passerr && (
              <div className="alert alert-danger">{this.state.passerr}</div>
            )}
            <div className="form-group">
              <input
                onChange={this.locationChangeHandler}
                type="text"
                className="form-control"
                name="location"
                placeholder="Email"
                required
              />
            </div>
            {this.state.usererr && (
              <div className="alert alert-danger">{this.state.usererr}</div>
            )}
            <br />
            <button onClick={this.submit} className="btn btn-primary">
              Signup
            </button>
            <br />
          </div>
        </div>
      </Container>
    );
  }
}
export default RestaurantSignup;

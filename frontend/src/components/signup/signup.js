import React, { Component } from "react";
import "../../App.css";
// import cookie from 'react-cookies';
import axios from "axios";
import { Redirect } from "react-router";
import { Container } from "react-bootstrap";
import { backendURL } from "../../config";
class RestaurantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      location: "",
      role: "Restaurant",
      dispform: null,
      authFlag: false,
    };
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  firstnameChangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };
  lastnameChangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };
  roleChangeHandler = (e) => {
    this.setState({
      role: e.target.value,
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
    //prevent page from refresh
    e.preventDefault();
    const data = {
      Role: this.state.role,
      FirstName: this.state.firstname,
      UserName: this.state.email,
      Password: this.state.password,
      location: this.state.location,
      LastName: this.state.lastname,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(backendURL + "/general/signup", data).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 201) {
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
      return <Redirect to="/login" />;
    }
    let output = null;
    if (this.state.role === "Restaurant") {
      output = (
        <>
          <div className="form-group">
            <input
              onChange={this.firstnameChangeHandler}
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              required
            />
          </div>

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
        </>
      );
    } else {
      output = (
        <>
          <div className="form-group">
            <input
              onChange={this.firstnameChangeHandler}
              type="text"
              className="form-control"
              name="fname"
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.lastnameChangeHandler}
              type="text"
              className="form-control"
              name="lname"
              placeholder="Last Name"
              required
            />
          </div>

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
        </>
      );
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
              <label for="cars">Choose a car:</label>
              <select
                id="cars"
                name="cars"
                size="3"
                onChange={this.roleChangeHandler}
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            {output}
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

import React, { Component } from "react";
import "../../App.css";
import { connect } from "react-redux";
import { login } from "../../Redux/constants/actiontypes";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { backendURL } from "../../config";
//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      role: "",
      authFlag: false,
      usererr: "",
      passerr: "",
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      usererr: "",
      passerr: "",
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  roleChangeHandler = (e) => {
    this.setState({
      role: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      UserName: this.state.username,
      Password: this.state.password,
      Role: this.state.role,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(backendURL + "/general/login", data).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log(response);
        const decoded = jwt_decode(response.data.split(" ")[1]);
        console.log("role", decoded.rol);
        localStorage.setItem("token", response.data);
        localStorage.setItem("userId", decoded.ID);
        localStorage.setItem("userrole", decoded.rol);
        localStorage.setItem("useremail", decoded.Name);
        localStorage.setItem("selectedDropDown", "Jobs");
        let userInfo = { Role: decoded.rol, ID: decoded.ID };
        this.props.login(userInfo);
        this.setState({
          authFlag: true,
        });
      }
      //set the with credentials to true
    });
  };
  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("userrole") === "Restaurant") {
        redirectVar = <Redirect to="/Employer" />;
      } else if (localStorage.getItem("userrole") === "Customer") {
        redirectVar = <Redirect to="/home" />;
      }
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Customer Login</h2>
                <p>Please enter your username and password</p>
              </div>
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
              <div className="form-group">
                <input
                  onChange={this.usernameChangeHandler}
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              {this.state.usererr !== "" && (
                <div className="alert alert-danger">{this.state.usererr}</div>
              )}
              <br />
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
              {this.state.passerr !== "" && (
                <div className="alert alert-danger">{this.state.passerr}</div>
              )}
              <br />
              <button onClick={this.submitLogin} className="btn btn-primary">
                Login
              </button>
              <br />
              <div className="form-group">
                <p>
                  <Link to="/signup">sign up?</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //const { userInfo } = state.userInfo;
  return {
    //userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => {
      dispatch({
        type: login,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Login);

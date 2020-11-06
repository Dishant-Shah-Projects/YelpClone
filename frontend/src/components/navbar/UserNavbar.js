import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { login } from "../../Redux/constants/actiontypes";
class Navbar2 extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: ownprops.userInfo,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    if ((this.state.user.ID==="") &&(localStorage.getItem("userId"))){
      let userInfo = { Role: localStorage.getItem("userrole"), ID: localStorage.getItem("userId") };
      this.props.login(userInfo);
    }
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("user", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("user")) {
      console.log("Able to read cookie");
      navLogin = (
        <div className="fixed-bottom">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/" onClick={this.handleLogout}>
                <span className="glyphicon glyphicon-user"></span>Logout
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      //Else display login button

      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    return (
      <div>
        {redirectVar}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Yelp Clone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/orders">Orders</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/restaurantsearch">Restaurants</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/events">Events</Link>
              </Nav.Link>
            </Nav>
            {navLogin}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userInfo = state.LoginReducer.userInfo;
  return {
    userInfo: userInfo,
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
export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);

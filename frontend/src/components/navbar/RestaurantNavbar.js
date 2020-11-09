import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class Navbar3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
    console.log(props);
    this.handleLogout = this.handleLogout.bind(this);
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
      console.log("Not Able to read cookie");
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
                <Link to="/events">Events</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/messages">Messages</Link>
              </Nav.Link>
            </Nav>
            {navLogin}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navbar3;

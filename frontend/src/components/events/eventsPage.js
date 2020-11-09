import React, { Component } from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Userevents from "./customerEvent";
import Restaurantevents from "./restaurantEvent";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
class Events extends Component {
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    if (localStorage.getItem("userrole") === "Customer") {
      return (
        <>
          <Navbar2></Navbar2>
          <Userevents></Userevents>
        </>
      );
    } else if (localStorage.getItem("userrole") === "Restaurant") {
      return (
        <>
          <Navbar3></Navbar3>
          <Restaurantevents></Restaurantevents>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default Events;

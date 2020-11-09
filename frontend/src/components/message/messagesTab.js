import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import CustomerMessage from "./customerMessage";
import RestaurantMessage from "./restaurantMessage";
class messageTab extends Component {
  render() {
    //iterate over books to create a table row

    console.log(localStorage.getItem("userrole"));
    if (localStorage.getItem("userrole") === "Customer") {
      console.log("Apple");
      return <CustomerMessage />;
    } else if (localStorage.getItem("userrole") === "Restaurant") {
      return (
        <>
          <RestaurantMessage></RestaurantMessage>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default messageTab;

import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from "./CustomerHome";
import RestaurantHome from "./RestaurantHome";
import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
class Home extends Component {
  render() {
    //iterate over books to create a table row

    console.log(localStorage.getItem("userrole"));
    if (localStorage.getItem("userrole") === "Customer") {
      return (
        <>
          <Navbar2></Navbar2>
          <CustomerHome></CustomerHome>
        </>
      );
    } else if (localStorage.getItem("userrole") === "Restaurant") {
      return (
        <>
          <Navbar3></Navbar3>
          <RestaurantHome></RestaurantHome>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default Home;

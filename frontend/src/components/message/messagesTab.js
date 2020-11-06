import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import customerMessage from "./customerMessage";
import restaurantMessage from "./restaurantMessage";
import { Redirect } from "react-router";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar"
class messageTab extends Component {
  render() {
    //iterate over books to create a table row

    console.log(localStorage.getItem("userrole"));
    if (localStorage.getItem("userrole") === "Customer") {
      return( <>
      <Navbar2></Navbar2>
      <customerMessage></customerMessage>
        </>
        );
    } else if (localStorage.getItem("userrole") === "Restaurant") {
      return( <>
        <Navbar3></Navbar3>
        <restaurantMessage></restaurantMessage>
          </>
          );
    } else {
      return <Redirect to="/login" />;
    }

  }
  
}

//export Home Component
export default messageTab;
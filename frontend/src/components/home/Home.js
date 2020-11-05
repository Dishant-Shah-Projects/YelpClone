import React, { Component } from "react";


import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from "./CustomerHome";
import RestaurantHome from "./RestaurantHome";
import { Redirect } from "react-router";

class Home extends Component {
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    let redirectVar = null;
    console.log(localStorage.getItem('userrole'));
    if (localStorage.getItem('userrole') === 'Customer') {
      return <CustomerHome></CustomerHome>;
    } else if (localStorage.getItem('userrole') === 'Restaurant') {
      return <RestaurantHome></RestaurantHome>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default Home;

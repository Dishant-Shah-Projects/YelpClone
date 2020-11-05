import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import UserOrders from "./CustomerOrder";
import RestaurantOrders from "./restorder";

class OrdersPage extends Component {
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    let redirectVar = null;
    if (cookie.load("customer")) {
      return <UserOrders></UserOrders>;
    } else if (cookie.load("restaurant")) {
      return <RestaurantOrders></RestaurantOrders>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default OrdersPage;

import React, { Component } from "react";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import UserOrders from "./CustomerOrder";
import RestaurantOrders from "./restaurantOrderTab";
import Navbar2 from "../navbar/UserNavbar";
import Navbar3 from "../navbar/RestaurantNavbar";
import { backendURL } from "../../config";
class OrdersPage extends Component {
  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    if (localStorage.getItem("userrole") === "Customer") {
      return (
        <>
          <UserOrders></UserOrders>
        </>
      );
    } else if (localStorage.getItem("userrole") === "Restaurant") {
      return (
        <>
          <RestaurantOrders></RestaurantOrders>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

//export Home Component
export default OrdersPage;

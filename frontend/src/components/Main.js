import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./login/userlogin";
import Navbar2 from "./navbar/UserNavbar";
import Home from "./home/Home";
import RestaurantMaps from "./restaurantsearchtab/Restaurants";
import Events from "./events/eventsPage";

// import Delete from './Delete/Delete';
// import Create from './Create/Create';

import RestaurantPage from "./profile/RestaurantPage";
import Userpage from "./profile/UserPage";
import Menu from "./restaurant/menu";

import OrdersPage from "./orders/OrdersPage";
// import Navbar3 from "./navbar/RestaurantNavbar";
import RestaurantSignup from "./signup/signup";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar2></Navbar2>
        <div>
          {/*Render Different Component based on Route*/}
          <Route path="/restsignup" component={RestaurantSignup} />
          <Route path="/login" component={Login} />
          <Route path="/events" component={Events} />

          <Route path="/orders" component={OrdersPage} />
          <Route path="/signup" component={RestaurantSignup} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user" exact component={Userpage} />
          <Route path="/restaurant" exact component={RestaurantPage} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/restaurantsearch" component={RestaurantMaps} />
        </div>
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;

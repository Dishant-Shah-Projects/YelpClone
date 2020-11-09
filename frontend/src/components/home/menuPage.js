import React, { Component } from "react";
import cookie from "react-cookies";
import {
  Button,
  Form,
  Container,
  FormGroup,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Menuitems from "./menuItems";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { menuload } from "../../Redux/constants/actiontypes";
class MenuPage extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      Restaurant: ownprops.userInfo,
      Restmenu: ownprops.menuinfo.menu,
      PageNo: ownprops.menuinfo.PageNo,
      Pages: ownprops.menuinfo.Pages,
    };
    console.log(ownprops.userInfo);
    this.pageup = this.pageup.bind(this);
    this.pagedown = this.pagedown.bind(this);
  }
  componentDidMount() {
    if (this.state.Restmenu.length === 0) {
      console.log(this.state.Restaurant);
      const data = {
        restaurantID: this.state.Restaurant.restaurantID,
        PageNo: 0,
      };
      axios.defaults.headers.common["authorization"] = localStorage.getItem(
        "token"
      );
      console.log(data);
      axios
        .post(backendURL + "/restaurant/menu", data)

        .then((response) => {
          //update the state with the response data
          console.log(response.data);
          this.setState({
            Restmenu: response.data[1],
            Pages: response.data[0],
          });
          let menu = {
            menu: this.state.Restmenu,
            PageNo: this.state.PageNo,
            Pages: this.state.Pages,
          };
          this.props.menu(menu);
        });
    }
  }
  pageup = () => {
    const data = {
      restaurantID: this.state.Restaurant.restaurantID,
      PageNo: this.state.PageNo + 1,
    };
    console.log(this.state);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/menu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data[1],
          Pages: response.data[0],
          PageNo: this.state.PageNo + 1,
        });
        let menu = {
          menu: this.state.Restmenu,
          PageNo: this.state.PageNo,
          Pages: this.state.Pages,
        };
        this.props.menu(menu);
      });
  };
  pagedown = () => {
    const data = {
      restaurantID: this.state.Restaurant.restaurantID,
      PageNo: this.state.PageNo - 1,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL + "/restaurant/menu", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Restmenu: response.data[1],
          Pages: response.data[0],
          PageNo: this.state.PageNo - 1,
        });
        let menu = {
          menu: this.state.Restmenu,
          PageNo: this.state.PageNo,
          Pages: this.state.Pages,
        };
        this.props.menu(menu);
      });
  };

  render() {
    console.log(this.state.Restmenu);
    let appitizers = null;
    try {
      appitizers = this.state.Restmenu.map((eve) => {
        return (
          <React.Fragment>
            <Menuitems iteminfo={eve}></Menuitems>
          </React.Fragment>
        );
      });
    } catch {
      console.log("not loaded");
    }
    let menus = null;

    return (
      <Container>
        <h1> Menu</h1>

        <Pagination>
          <Pagination.Prev onClick={this.pagedown} />
          <Pagination.Item disabled>
            {this.state.PageNo + "/" + this.state.Pages}
          </Pagination.Item>

          <Pagination.Next onClick={this.pageup} />
        </Pagination>
        {appitizers}
      </Container>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  console.log(state.menuReducer.menuinfo);
  const userInfo = state.profilereducer.profileinfo;
  const menuinfo = state.menuReducer.menuinfo;
  if (menuinfo.PageNo === -1) {
    menuinfo.PageNo = 0;
    menuinfo.Pages = 0;
  }
  return {
    userInfo: userInfo,
    menuinfo: menuinfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menu: (payload) => {
      dispatch({
        type: menuload,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);

import React, { Component } from "react";
import "../../App.css";

import axios from "axios";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class Follow extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      info: ownprops.userInfo,
      ID: ownprops.ID,
      name: ownprops.name,
      Registered: false,
    };
    console.log(this.state.info);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    var found = false;
    for (var i = 0; i < this.state.info.PeopleFollowed.length; i++) {
      if (this.state.info.PeopleFollowed[i].CustomerID == this.state.ID) {
        found = true;
        break;
      }
    }
    if (found) {
      this.setState({
        Registered: true,
      });
    }
  }

  handleClick = (e) => {
    const data = {
      followID: this.state.ID,
      customerID: this.state.info.customerID,
      CustomerName: this.state.name,
    };
    axios
      .post(backendURL + "/customer/customerFollow", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Registered: true,
          });
        } else {
          this.setState({
            Registered: false,
          });
        }
      });
    return false;
  };

  render() {
    let reg = null;
    if (this.state.Registered) {
      console.log("yolo");

      reg = (
        <Button disabled size="sm">
          Followed!
        </Button>
      );
    } else {
      reg = (
        <Button onClick={this.handleClick} size="sm">
          Follow
        </Button>
      );
    }

    return (
      <>
        <Container>{reg}</Container>
      </>
    );
  }
}
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.profilereducer.profileinfo);
  const userInfo = state.profilereducer.profileinfo;
  return {
    userInfo: userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (payload) => {
      dispatch({
        type: profile,
        payload,
      });
    },
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Follow);

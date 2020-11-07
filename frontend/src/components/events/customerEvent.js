import React, { Component } from "react";
import "../../App.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Pagination,
} from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Regevent from "./eventRegister";
import { backendURL } from "../../config";
import { connect } from "react-redux";
import { profile } from "../../Redux/constants/actiontypes";
class Userevents extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      user: ownprops.userInfo,
      Events: [],
      dispEvents: [],
      PageNo:0,
      Pages:0,
      Sorted:false,
      Filtered:false,
      SearchString:"",
    };
    this.handleregiseter = this.handleregiseter.bind(this);
    this.handleupcoming = this.handleupcoming.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
    this.paginate = this.paginate.bind(this);
    this.updateterm = this.updateterm.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus:"",
      Sorted:this.state.Sorted,
      Filtered:this.state.Filtered,
      PageNo:0,
      Pages:0,
      SearchString:"",
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/events",data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
          Pages:response.data[0],
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      SearchString: e.target.value,
    });
  };
  handleupcoming = (e) => {
    console.log(e);
    console.log(this.state.user);
    if(this.state.Sorted){
      this.setState({
        Sorted:false,
        PageNo:0,
      })
    }
    else{
      this.setState({
        Sorted:false,
        PageNo:0,
      })
    }
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus:"",
      Sorted:this.state.Sorted,
      Filtered:this.state.Filtered,
      PageNo:0,
      Pages:0,
      SearchString:"",
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/events",data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
          Pages:response.data[0],
        });
      });
  };
  handleregiseter = (e) => {
    console.log(e);
    console.log(this.state.user);
    if(this.state.Sorted){
      this.setState({
        Filtered:false,
        PageNo:0,
      })
    }
    else{
      this.setState({
        Filtered:true,
        PageNo:0,
      })
    }
    console.log(this.state.user);
    const data = {
      customerID: this.state.user.ID,
      OrderStatus:"",
      Sorted:this.state.Sorted,
      Filtered:this.state.Filtered,
      PageNo:0,
      Pages:0,
      OrderStatus:" Order Received",
      SearchString:"",
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/events",data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
          Pages:response.data[0],
        });
      });
  };
  handleupsearch = (e) => {
    this.setState({
      Sorted:false,
      Filtered:false,
      PageNo:0,
    })
    const data = {
      customerID: this.state.user.ID,
      OrderStatus:"",
      Sorted:this.state.Sorted,
      Filtered:this.state.Filtered,
      PageNo:this.state.PageNo,
      Pages:0,
      SearchString:this.state.SearchString,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/customer/events",data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        this.setState({
          Events: response.data,
          dispEvents: response.data,
          Pages:response.data[0],
        });
      });
  };
 
  render() {
    console.log(this.state.Events);
    let eventsdisp = null;
    eventsdisp = this.state.dispEvents.map((eve) => {
      return (
        <React.Fragment>
          <Card>
            <Card.Title>{eve.EventName}</Card.Title>

            <a>{eve.Description}</a>

            <a>{eve.Location}</a>
            <a>{eve.Time}</a>
            <a>{eve.Date}</a>
            <a>{eve.Hashtags}</a>
            <Regevent
              UserEmail={cookie.load("user")}
              RestEmail={eve.RestaurantEmail}
              eventName={eve.EventName}
            />
          </Card>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <Row>
          <Col>
            <Button onClick={this.handleupcoming}>Upcoming Events</Button>
          </Col>
          <Col>
            <Button onClick={this.handleregiseter}>Registered</Button>
          </Col>

          <Col>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.updateterm}
              />
              <Button onClick={this.handleupsearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
    <br />
        <h1>Events Page</h1>
        {eventsdisp}
      </Container>
    );
  }
}
//export Home Component
const mapStateToProps = (state, ownprops) => {
  console.log(state.LoginReducer.userInfo);
  const userInfo = state.LoginReducer.userInfo;
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
export default connect(mapStateToProps, mapDispatchToProps)(Userevents);

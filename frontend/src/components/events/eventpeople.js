import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Accordion,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Order component for User
class Peopleevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: props.eventname,
      users: [],
    };
    console.log(this.state);
  }
  componentDidMount() {
    console.log(this.state.user);
    const data = {
      EventName: this.state.eventname,
    };
    axios
      .post("http://localhost:3001/registeredpeople", data)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
        console.log("Status Code : ", response.status);

        this.setState({
          users: response.data,
        });
      });
  }

  render() {
    var Output = null;
    console.log(this.state.Orderitems);
    Output = this.state.users.map((eve) => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <Link to={{ pathname: "/user", state: { foo: eve.UserEmail } }}>
                {eve.CustomerName}
              </Link>
            </td>
          </tr>
        </React.Fragment>
      );
    });

    return (
      <Container>
        <a>yoloswag</a>

        <Accordion defaultActiveKey="1">
          <Accordion.Toggle as={Button} variant="warning" eventKey="0">
            People Registered
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {Output}
                <tr>
                  <th>Total</th>
                </tr>
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Accordion>
      </Container>
    );
  }
}
export default Peopleevent;

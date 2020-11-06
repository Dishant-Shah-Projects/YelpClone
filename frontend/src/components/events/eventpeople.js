import React, { Component } from "react";
import "../../App.css";

import { Link } from "react-router-dom";
import { Button, Container, Accordion, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Order component for User
class Peopleevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      users:props.event.PeopleRegistered
    };
    console.log(this.state);
  }
  componentDidMount() {

  }

  render() {
    var Output = null;
    console.log(this.state.Orderitems);
    Output = this.state.users.map((eve) => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <Link to={{ pathname: "/user", state: { foo: eve.CustomerID } }}>
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

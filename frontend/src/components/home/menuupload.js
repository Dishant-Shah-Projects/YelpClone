import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import axios from "axios";
import { Form, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { backendURL } from "../../config";
class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RestaurantEmail: cookie.load("user"),
      ItemName: "",
      ItemCost: "",
      ItemDesc: "",
      ItemCat: "",
      Itemimg: null,
      MainIngredients: "",
      Redvar: false,
    };
    this.ItemNameChangeHandler = this.ItemNameChangeHandler.bind(this);
    this.ItemCostChangeHandler = this.ItemCostChangeHandler.bind(this);
    this.ItemDescChangeHandler = this.ItemDescChangeHandler.bind(this);
    this.ItemCatChangeHandler = this.ItemCatChangeHandler.bind(this);
    this.MainIngredientsChangeHandler = this.MainIngredientsChangeHandler.bind(
      this
    );
    this.ItemimgChangeHandler = this.ItemimgChangeHandler.bind(this);
    this.submit = this.submit.bind(this);
  }
  ItemNameChangeHandler = (e) => {
    this.setState({
      ItemName: e.target.value,
    });
  };
  ItemCostChangeHandler = (e) => {
    this.setState({
      ItemCost: e.target.value,
    });
  };
  ItemDescChangeHandler = (e) => {
    this.setState({
      ItemDesc: e.target.value,
    });
  };
  ItemCatChangeHandler = (e) => {
    this.setState({
      ItemCat: e.target.value,
    });
  };
  MainIngredientsChangeHandler = (e) => {
    this.setState({
      MainIngredients: e.target.value,
    });
  };
  ItemimgChangeHandler = (event) => {
    this.setState({ Itemimg: event.target.files[0] });
  };

  componentWillMount() {
    this.setState({
      Redvar: false,
      EventName: "",
      EventDate: "",
    });
  }

  submit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "profileImage",
      this.state.Itemimg,
      this.state.Itemimg.name
    );
    formData.append("RestaurantEmail", this.state.RestaurantEmail);
    formData.append("ItemName", this.state.ItemName);
    formData.append("ItemCost", this.state.ItemCost);
    formData.append("ItemDesc", this.state.ItemDesc);
    formData.append("ItemCat", this.state.ItemCat);
    formData.append("MainIngredients", this.state.MainIngredients);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .post(backendURL+"/menuupload", formData)

      .then((response) => {
        //update the state with the response data
        console.log(response.data);
      });
  };
  render() {
    return (
      <Form>
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          onChange={this.ItemNameChangeHandler}
        />
        <Form.Label>Item Cost</Form.Label>
        <Form.Control
          type="number"
          placeholder="Nickname"
          onChange={this.ItemCostChangeHandler}
        />
        <Form.Label>Item Desccription </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          onChange={this.ItemDescChangeHandler}
        />
        <Form.Label>Item Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Normal text"
          onChange={this.ItemCatChangeHandler}
        />
        <Form.Label>Main Ingredients</Form.Label>
        <Form.Control
          type="text"
          placeholder="Normal text"
          onChange={this.MainIngredientsChangeHandler}
        />
        <Form.Group as={Row}>
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={this.ItemimgChangeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.submit}>
          Submit
        </Button>
      </Form>
    );
  }
}
export default AddMenu;

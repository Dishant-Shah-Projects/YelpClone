import React, { Component } from "react";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: { lat: props.location.lat, lng: props.location.lng },
      stores: props.rest,
    };
    console.log(this.state.store);
    console.log(props);
  }

  displayMarkers = () => {
    if (this.state.stores) {
      return this.state.stores.map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: store.Restaurantlat,
              lng: store.Restaurantlng,
            }}
            onClick={() => console.log("You clicked me!")}
          />
        );
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.rest !== this.props.rest) {
      this.setState({
        stores: this.props.rest,
      });
    }
  }
  render() {
    const mapStyles = {
      width: "50%",
      height: "50%",
    };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{
          lat: this.state.current.lat,
          lng: this.state.current.lng,
        }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBej0Pq1ieVvLjN9gq-ic0_GL81LytLEH4",
})(MapContainer);

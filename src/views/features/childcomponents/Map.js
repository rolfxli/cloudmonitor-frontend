/* Listings Map front end page */

import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";


// Functional component for Google Map View
function Map({markers}) {
  return (
    <GoogleMap
      defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
      defaultZoom={4}
      defaultOptions={{
        scrollwheel: true,
        gestureHandling: "greedy",
      }}
    >
        {markers.map((marker) => 
        <Marker
        position={{lat: parseFloat(marker[2][0]), lng: parseFloat(marker[2][1])}}
        label={marker[1].toString()}
        icon={{
          url:
            "https://upload.wikimedia.org/wikipedia/commons/3/31/Button_Icon_Green.svg",
          scaledSize: new window.google.maps.Size(35, 35),
        }}
      />
        )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(
  withGoogleMap((props) => <Map {...props}></Map>)
);

// Main map functional component
function Mainmap({ locations }) {


  return (

    <div style={{ maxWidth: "100vh", height: "100vh" }}>
    <MapWrapped
        style={{ width: "100vh", height: "100vh" }}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAneQqCpCbU0w-COup5vnwpWneOJvnnHDo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers = {locations}
    />
    </div>
  );
}


export default Mainmap;

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osmProvider";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
  const [center, setCenter] = useState({ lat: 48.005417, lng: 0.201853 });
  const ZOOM_LEVEL = 15;
  const mapRef = useRef();

  return (
    <div>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: "300px", width: "750px", position: "relative" }}
      >
        <TileLayer
          url={osm.mapTiler.url}
          attribution={osm.mapTiler.attribution}
        />
      </MapContainer>
    </div>
  );
};

export default BasicMap;

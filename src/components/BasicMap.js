import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import osm from "./osmProvider";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Définir les icônes personnalisées pour escape et around
const escapeIcon = new L.Icon({
  iconUrl: require("../images/pingEscapeGame2.png"),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const aroundIcon = new L.Icon({
  iconUrl: require("../images/pingAround2.png"),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const BasicMap = () => {
  const escapeURL = "http://127.0.0.1:8000/api/escape";
  const aroundURL = "http://127.0.0.1:8000/api/around";
  const [center, setCenter] = React.useState({ lat: 48.005417, lng: 0.201853 });
  const ZOOM_LEVEL = 10.2;
  const [escapes, setEscapes] = React.useState([]);
  const [arounds, setArounds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const escapeResponse = await axios.get(escapeURL);
        const aroundResponse = await axios.get(aroundURL);
        setEscapes(escapeResponse.data);
        setArounds(aroundResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("escapes: ", escapes);
  console.log("arounds: ", arounds);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Quelque chose ne passe pas: {error.message}</p>;

  return (
    <div>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ height: "550px", width: "750px" }}
      >
        <TileLayer
          url={osm.mapTiler.url}
          attribution={osm.mapTiler.attribution}
        />
        {escapes.map((escape, index) => (
          <Marker
            key={index}
            position={[escape.lat_escape, escape.long_escape]}
            icon={escapeIcon}
          >
            <Popup>
              <div style={{ fontWeight: "bold", color: "blue" }}>
                {escape.name_escape}
              </div>
              <div>{escape.address_escape}</div>
              <div>{escape.town_escape}</div>
              {/* <div>{escape.description_escape}</div> */}
            </Popup>
          </Marker>
        ))}
        {arounds.map((around, index) => (
          <Marker
            key={index}
            position={[around.lat_around, around.long_around]}
            icon={aroundIcon}
          >
            <Popup>
              <div style={{ fontWeight: "bold", color: "green" }}>
                {around.name_around}
              </div>
              <div>{around.address_around}</div>
              <div>{around.town_around}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BasicMap;

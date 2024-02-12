import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

const customIconUrl = require("./icons8-100--16.png");
const customIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [7.5, 7.5],
});

interface Postcode {
  _id: string;
  lat: number;
  long: number;
  postcode: string;
}

const MyMap = () => {
  const [postcodes, setPostcodes] = useState<Postcode[] | null>(null);
  useEffect(() => {
    const fetchPostcodes = async () => {
      const response = await fetch("/api/postcodes");
      const json = await response.json();

      if (response.ok) {
        setPostcodes(json);
      }
    };

    fetchPostcodes();
  }, []);
  return (
    <div>
      <MapContainer
        style={{ height: "600px" }}
        center={[51.744498, -0.328599]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {postcodes &&
          postcodes.map((postcode) => (
            <Marker
              icon={customIcon}
              key={postcode._id}
              position={[postcode.lat, postcode.long]}
            >
              <Popup>
                <b>{postcode.postcode}</b>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;

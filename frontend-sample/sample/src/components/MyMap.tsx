import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import locationSvg from "./circle-svgrepo-com.svg";

const customIcon1 = new L.Icon({
  iconUrl: locationSvg,
  iconSize: new L.Point(40, 47),
});

interface Postcode {
  _id: string;
  lat: number;
  long: number;
  postcode: string;
  avg_price_all_years: number;
  avg_price_2015: number;
  avg_price_2016: number;
  avg_price_2017: number;
  avg_price_2018: number;
  avg_price_2019: number;
  avg_price_2020: number;
  avg_price_2021: number;
  avg_price_2022: number;
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
        style={{ height: "700px" }}
        center={[51.744498, -0.328599]}
        zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {postcodes &&
            postcodes.map((postcode) => (
              <Marker
                icon={customIcon1}
                key={postcode._id}
                position={[postcode.lat, postcode.long]}
              >
                <Popup>
                  <b>{postcode.postcode}</b>
                  <br />
                  Latitude: <b>{postcode.lat}</b>
                  <br />
                  Longtitude: <b>{postcode.long}</b>
                  <br />
                  Average Price 2015-2022: <b>{postcode.avg_price_all_years}</b>
                  <br />
                  Average 2015: <b>{postcode.avg_price_2015}</b>
                  <br />
                  Average 2016: <b>{postcode.avg_price_2016}</b>
                  <br />
                  Average 2017: <b>{postcode.avg_price_2017}</b>
                  <br />
                  Average 2018: <b>{postcode.avg_price_2018}</b>
                  <br />
                  Average 2019: <b>{postcode.avg_price_2019}</b>
                  <br />
                  Average 2020: <b>{postcode.avg_price_2020}</b>
                  <br />
                  Average 2021: <b>{postcode.avg_price_2021}</b>
                  <br />
                  Average 2022: <b>{postcode.avg_price_2022}</b>
                </Popup>
                <Tooltip>
                  <b>{postcode.postcode}</b>
                  <br></br>
                  Average Price 2015-2022: <b>{postcode.avg_price_all_years}</b>
                </Tooltip>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MyMap;

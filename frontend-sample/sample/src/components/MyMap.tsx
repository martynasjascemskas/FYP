import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import locationSvg from "./circle-svgrepo-com.svg";
import LineChartMUI from "./LineGraph";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
import GetCurrentViewBounds from "./GetCurrentViewBounds";
import "leaflet-draw/dist/leaflet.draw.css";
import EditFeature from "./EditFeature";

const customIcon1 = new L.Icon({
  iconUrl: locationSvg,
  iconSize: new L.Point(40, 47),
});
export interface Postcode {
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

const MyMap = (props: { value: number[] }) => {
  const [postcodes, setPostcodes] = useState<Postcode[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const prov = new OpenStreetMapProvider();
  useEffect(() => {
    const fetchPostcodes = async (minPrice: number, maxPrice: number) => {
      setIsLoading(true);
      const response = await fetch(
        `/api/postcodes?minPrice=${minPrice}&maxPrice=${maxPrice}&currentView=[51.748756628771774,-0.30229858398437506,51.72388736878808,-0.38726806640625]`
      );
      const json = await response.json();

      if (response.ok) {
        console.log("map fetch 51.748756628771774,-0.30229858398437506,51.72388736878808,-0.38726806640625", minPrice, maxPrice);
        setPostcodes(json);
        setIsLoading(false);
      }
    };

    fetchPostcodes(props.value[0], props.value[1]);
  }, [props.value]);
  return (
    <div>
      {isLoading && <LinearProgress />}
      <MapContainer
        style={{ height: "87vh" }}
        center={[51.744498, -0.328599]}
        zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl
          provider={prov}
          showMarker={true}
          showPopup={false}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Search"}
          notFoundMessage={"Address Not Found"}
          keepResult={true}
        />
        <GetCurrentViewBounds />
        <EditFeature filterValues={props.value} />
        <MarkerClusterGroup
          chunkedLoading={true}
          removeOutsideVisibleBounds={true}
          disableClusteringAtZoom={16}
          spiderfyOnMaxZoom={false}
        >
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
                  <LineChartMUI
                    averageHousePricePerPostcode={{
                      "2015": postcode.avg_price_2015,
                      "2016": postcode.avg_price_2016,
                      "2017": postcode.avg_price_2017,
                      "2018": postcode.avg_price_2018,
                      "2019": postcode.avg_price_2019,
                      "2020": postcode.avg_price_2020,
                      "2021": postcode.avg_price_2021,
                      "2022": postcode.avg_price_2022,
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(`/houseSalesByPostcode/${postcode.postcode}`);
                    }}
                  >
                    Details
                  </Button>
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

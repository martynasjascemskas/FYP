import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import locationSvg from "./assets/circle-svgrepo-com.svg";
import LineChartMUI from "./LineGraph";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
import "leaflet-draw/dist/leaflet.draw.css";
import EditFeature from "./EditFeature";
import _debounce from "lodash/debounce";

// Custom icon svg
const customIcon1 = new L.Icon({
  iconUrl: locationSvg,
  iconSize: new L.Point(40, 47),
});
interface Postcode {
  _id: string;
  lat: number;
  long: number;
  postcode: string;
  median_price_all_years: number;
  median_price_2018: number;
  median_price_2019: number;
  median_price_2020: number;
  median_price_2021: number;
  median_price_2022: number;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
}).format;
const MyMap = (props: { value: number[] }) => {
  const [postcodes, setPostcodes] = useState<Postcode[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewNorthEastLat, setViewNorthEastLat] =
    useState<number>(52.43257155802884);
  const [viewNorthEastLng, setViewNorthEastLng] =
    useState<number>(1.8402099609375002);
  const [viewSouthWestLat, setViewSouthWestLat] =
    useState<number>(51.07246834624619);
  const [viewSouthWestLng, setViewSouthWestLng] =
    useState<number>(-2.4444580078125004);
  const navigate = useNavigate();
  const prov = new OpenStreetMapProvider();
  useEffect(() => {
    const fetchPostcodes = async (minPrice: number, maxPrice: number) => {
      setIsLoading(true);
      //first fetch default state values, then fetching values depending on filter and map view bounds.
      const response = await fetch(
        `/api/postcodes?minPrice=${minPrice}&maxPrice=${maxPrice}&currentView=[${viewNorthEastLat},${viewNorthEastLng},${viewSouthWestLat},${viewSouthWestLng}]`
      );
      const json = await response.json();

      if (response.ok) {
        console.log(
          `map fetch ${viewNorthEastLat},${viewNorthEastLng},${viewSouthWestLat},${viewSouthWestLng}`,
          minPrice,
          maxPrice
        );
        setPostcodes(json);
        setIsLoading(false);
      }
    };
    fetchPostcodes(props.value[0], props.value[1]);
  }, [
    props.value,
    viewNorthEastLat,
    viewNorthEastLng,
    viewSouthWestLat,
    viewSouthWestLng,
  ]);
  const GetCurrentViewBounds = () => {
    // function to get map view bounds. Created to minimise the amount of postcodes being fetched.
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      const debouncedUpdateBounds = _debounce(() => {
        setViewNorthEastLat(map.getBounds().getNorthEast().lat);
        setViewNorthEastLng(map.getBounds().getNorthEast().lng);
        setViewSouthWestLat(map.getBounds().getSouthWest().lat);
        setViewSouthWestLng(map.getBounds().getSouthWest().lng);
      }, 1000);
      // Sending map events on zoom end and drag end to debounce function(set timeout) everytime you drag or zoom on map
      // This was done in order to set an action timer and then fetch required postcodes if user stops moving
      map.on("zoomend", debouncedUpdateBounds);
      map.on("drag", debouncedUpdateBounds);
      return () => {
        map.off("zoomend", debouncedUpdateBounds);
        map.off("drag", debouncedUpdateBounds);
      };
    }, [map]);
    return null;
  };
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
          style={"bar"}
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
                  Median Price 2018-2022:{" "}
                  <b>{currencyFormatter(postcode.median_price_all_years)}</b>
                  <LineChartMUI
                    medianHousePricePerPostcode={{
                      "2018": postcode.median_price_2018,
                      "2019": postcode.median_price_2019,
                      "2020": postcode.median_price_2020,
                      "2021": postcode.median_price_2021,
                      "2022": postcode.median_price_2022,
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
                  Median Price 2018-2022:{" "}
                  <b>{currencyFormatter(postcode.median_price_all_years)}</b>
                </Tooltip>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MyMap;

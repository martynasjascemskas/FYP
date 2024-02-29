import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import LineChartMUI from "./LineGraph";
import { useCallback, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const EditFeature = (props: { filterValues: number[] }) => {
  const navigate = useNavigate();
  const _onCreated = useCallback(
    // @ts-expect-error Javascript
    async (e) => {
      const type = e.layerType;
      const layer = e.layer;
      console.log("_onCreated: ", type, e);
      const rectangleNorthEastLat = layer.getBounds().getNorthEast().lat;
      const rectangleNorthEastLng = layer.getBounds().getNorthEast().lng;
      const rectangleSouthWestLat = layer.getBounds().getSouthWest().lat;
      const rectangleSouthWestLng = layer.getBounds().getSouthWest().lng;

      const response = await fetch(
        `/api/postcodes?minPrice=${props.filterValues[0]}&maxPrice=${props.filterValues[1]}&currentView=[${rectangleNorthEastLat}, ${rectangleNorthEastLng},${rectangleSouthWestLat}, ${rectangleSouthWestLng}]`
      );
      const json = await response.json();
      let postcodes = null;
      if (response.ok) {
        // console.log(
        //   "fetching Edit Features",
        //   props.filterValues[0],
        //   props.filterValues[1],
        //   rectangleNorthEastLat,
        //   rectangleNorthEastLng,
        //   rectangleSouthWestLat,
        //   rectangleSouthWestLng
        // );
        postcodes = json;
      }
      console.log(postcodes);
      const selectedArea: string[] = postcodes.map(
        // @ts-expect-error type -> postcode
        (postcode) => postcode.postcode
      );
      const averagePrice = calculateAvgPrice(postcodes);
      const averagePricesAllYears = calculateYearlyAvgPrice(postcodes);
      const div = document.createElement("div");
      const root = createRoot(div);
      flushSync(() => {
        root.render(
          <>
            <LineChartMUI
              averageHousePricePerPostcode={{
                "2015": Number(averagePricesAllYears[0]),
                "2016": Number(averagePricesAllYears[1]),
                "2017": Number(averagePricesAllYears[2]),
                "2018": Number(averagePricesAllYears[3]),
                "2019": Number(averagePricesAllYears[4]),
                "2020": Number(averagePricesAllYears[5]),
                "2021": Number(averagePricesAllYears[6]),
                "2022": Number(averagePricesAllYears[7]),
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/houseSalesByPostcode/selected/${selectedArea}`);
              }}
            >
              DETAILS
            </Button>
          </>
        );
      });

      const popupOptions = { className: "customPopup" };
      const template = getTemplate(
        averagePrice,
        rectangleNorthEastLat,
        rectangleNorthEastLng,
        rectangleSouthWestLat,
        rectangleSouthWestLng,
        div
      );
      layer.bindPopup(template, popupOptions).openPopup();
    },
    [navigate, props.filterValues]
  );
  const onCreatedRef = useRef(_onCreated);
  useEffect(() => {
    onCreatedRef.current = _onCreated;
  }, [_onCreated]);

  // @ts-expect-error type -> postcodes
  const calculateAvgPrice = (postcodes) => {
    const total = postcodes.reduce(
      // @ts-expect-error type -> postcode
      (sum: number, postcode) => sum + postcode.avg_price_all_years,
      0
    );
    const averagePrice = (total / postcodes.length).toFixed(0);
    return averagePrice;
  };
  // @ts-expect-error type -> postcodes
  const calculateYearlyAvgPrice = (postcodes) => {
    const years = [
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
    ];
    const averagePricesAllYears = years.map((year) => {
      const validPostcodes = postcodes.filter(
        // @ts-expect-error type -> postcode
        (postcode) => postcode[`avg_price_${year}`] !== 0
      );
      const totalPrices = validPostcodes.reduce(
        // @ts-expect-error type -> postcode
        (sum: number, postcode) => sum + postcode[`avg_price_${year}`],
        0
      );
      return validPostcodes.length > 0
        ? (totalPrices / validPostcodes.length).toFixed(0)
        : 0;
    });
    return averagePricesAllYears;
  };
  const getTemplate = (
    averagePrice: string,
    rectangleNorthEastLat: number,
    rectangleNorthEastLng: number,
    rectangleSouthWestLat: number,
    rectangleSouthWestLng: number,
    div: HTMLDivElement
  ) => {
    const containerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML =
      `<div>Selected Area Average: <b>${averagePrice}</b></div>` +
      `<div>Selected Coordinates: <br/> <b>[${(
        Math.round(rectangleNorthEastLat * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleNorthEastLng * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleSouthWestLat * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleSouthWestLng * 10000000) / 10000000
      ).toFixed(7)}]</b></div>`;

    containerDiv.appendChild(infoDiv);
    containerDiv.appendChild(div);
    return containerDiv;
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        onCreated={(e) => onCreatedRef.current(e)}
        edit={{ remove: true, edit: false }}
        draw={{
          rectangle: { showArea: false }, // *IMPORTANT*: DO NOT REMOVE showArea AS DRAWING WILL NOT WORK(BUG IN LEAFLET DRAW)
          polyline: false,
          circlemarker: false,
          circle: false,
          polygon: false,
          marker: false,
        }}
      />
    </FeatureGroup>
  );
};

export default EditFeature;

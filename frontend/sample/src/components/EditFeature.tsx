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
      const medianPrice = calculateMedianPrice(postcodes);
      const medianPricesAllYears = calculateYearlyMedianPrice(postcodes);
      const div = document.createElement("div");
      const root = createRoot(div);
      flushSync(() => {
        root.render(
          <>
            <LineChartMUI
              medianHousePricePerPostcode={{
                "2018": Number(medianPricesAllYears[0]),
                "2019": Number(medianPricesAllYears[1]),
                "2020": Number(medianPricesAllYears[2]),
                "2021": Number(medianPricesAllYears[3]),
                "2022": Number(medianPricesAllYears[4]),
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
        medianPrice,
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
  const calculateMedianPrice = (postcodes) => {
    const sortedPrices = postcodes
      // @ts-expect-error type -> postcodes
      .map((postcode) => postcode.median_price_all_years)
      // @ts-expect-error type -> a, b
      .sort((a, b) => a - b);

    let median;

    if (sortedPrices.length % 2 === 0) {
      const middle1 = sortedPrices[sortedPrices.length / 2 - 1];
      const middle2 = sortedPrices[sortedPrices.length / 2];
      median = ((middle1 + middle2) / 2).toFixed(0);
    } else {
      const middleIndex = Math.floor(sortedPrices.length / 2);
      median = sortedPrices[middleIndex].toFixed(0);
    }
    return median;
  };
  // @ts-expect-error type -> postcodes
  const calculateYearlyMedianPrice = (postcodes) => {
    const years = ["2018", "2019", "2020", "2021", "2022"];
    const medianPricesAllYears = years.map((year) => {
      const validPostcodes = postcodes.filter(
        // @ts-expect-error type -> postcodes
        (postcode) => postcode[`median_price_${year}`] !== 0
      );

      const sortedPrices = validPostcodes
        .map(
          // @ts-expect-error type -> postcodes
          (postcode) => postcode[`median_price_${year}`]
        )
        // @ts-expect-error type -> a, b
        .sort((a, b) => a - b);

      let median;

      if (sortedPrices.length > 0) {
        if (sortedPrices.length % 2 === 0) {
          const middle1 = sortedPrices[sortedPrices.length / 2 - 1];
          const middle2 = sortedPrices[sortedPrices.length / 2];
          median = ((middle1 + middle2) / 2).toFixed(0);
        } else {
          const middleIndex = Math.floor(sortedPrices.length / 2);
          median = sortedPrices[middleIndex].toFixed(0);
        }
      } else {
        median = 0;
      }

      return median;
    });

    return medianPricesAllYears;
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format;
  const getTemplate = (
    medianPrice: string,
    rectangleNorthEastLat: number,
    rectangleNorthEastLng: number,
    rectangleSouthWestLat: number,
    rectangleSouthWestLng: number,
    div: HTMLDivElement
  ) => {
    const medianPriceNumber = parseFloat(medianPrice);
    const formattedMedianPrice = currencyFormatter(medianPriceNumber);
    const containerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML =
      `<div>Selected Area Average: <b>${formattedMedianPrice}</b></div>` +
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

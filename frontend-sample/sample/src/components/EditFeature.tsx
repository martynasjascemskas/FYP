import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import LineChartMUI from "./LineGraph";
const EditFeature = (props: { filterValues: number[] }) => {
  // @ts-expect-error Javascript
  const _onCreated = async (e) => {
    const type = e.layerType;
    const layer = e.layer;
    //console.log(layer);
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }
    const rectangleNorthEastLat = layer.getBounds().getNorthEast().lat;
    const rectangleNorthEastLng = layer.getBounds().getNorthEast().lng;
    const rectangleSouthWestLat = layer.getBounds().getSouthWest().lat;
    const rectangleSouthWestLng = layer.getBounds().getSouthWest().lng;
    const response = await fetch(
      `/api/postcodes?minPrice=${props.filterValues[0]}&maxPrice=${props.filterValues[1]}&currentView=[${rectangleNorthEastLat}, ${rectangleNorthEastLng},${rectangleSouthWestLat}, ${rectangleSouthWestLng}]`
    );
    const json = await response.json();
    // @ts-expect-error type
    let postcodes = null;
    if (response.ok) {
      console.log(
        "fetching Edit Features",
        props.filterValues[0],
        props.filterValues[1],
        rectangleNorthEastLat,
        rectangleNorthEastLng,
        rectangleSouthWestLat,
        rectangleSouthWestLng
      );
      postcodes = json;
    }
    console.log(postcodes);
    const total = postcodes.reduce(
      // @ts-expect-error type
      (sum: number, postcode) => sum + postcode.avg_price_all_years,
      0
    );
    const averagePrice = (total / postcodes.length).toFixed(0);
    console.log(averagePrice);

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
      // @ts-expect-error type
      const validPostcodes = postcodes.filter(
        // @ts-expect-error type
        (postcode) => postcode[`avg_price_${year}`] !== 0
      );
      const totalPrices = validPostcodes.reduce(
        // @ts-expect-error type
        (sum, postcode) => sum + postcode[`avg_price_${year}`],
        0
      );
      console.log("total " + totalPrices + " length " + validPostcodes.length);
      return validPostcodes.length > 0
        ? (totalPrices / validPostcodes.length).toFixed(0)
        : 0;
    });
    console.log(averagePricesAllYears);
    console.log(111111);

    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => {
      root.render(
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
      );
    });
    const popupOptions = { className: "customPopup" };
    const template =
      `<div>Selected Area Average: <b>${averagePrice}</b></div>` +
      `<div>Selected Coordinates: <br/> <b>[${(
        Math.round(rectangleNorthEastLat * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleNorthEastLng * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleSouthWestLat * 10000000) / 10000000
      ).toFixed(7)} ${(
        Math.round(rectangleSouthWestLng * 10000000) / 10000000
      ).toFixed(7)}]</b></div>` +
      div.innerHTML;
    layer.bindPopup(template, popupOptions).openPopup();
  };

  // @ts-expect-error Javascript
  const _onDeleted = (e) => {
    let numDeleted = 0;
    // @ts-expect-error Javascript
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
  };
  // @ts-expect-error Javascript
  const _onDrawStart = (e) => {
    console.log("_onDrawStart", e);
  };

  return (
    <FeatureGroup>
      <EditControl
        onDrawStart={_onDrawStart}
        position="topleft"
        onCreated={_onCreated}
        onDeleted={_onDeleted}
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

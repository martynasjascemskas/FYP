import React, { useMemo } from "react";
import { Rectangle, useMap } from "react-leaflet";

const innerBounds: [number, number][] = [
  [49.505, -2.09],
  [53.505, 2.09],
];

const redColor = { color: "red" };
const whiteColor = { color: "white" };

function RectangleSomething() {
  const map = useMap();

  const innerHandlers = useMemo(
    () => ({
      click() {
        map.fitBounds(innerBounds);
      },
    }),
    [map]
  );

  return (
    <>
      <Rectangle
        bounds={innerBounds}
        eventHandlers={innerHandlers}
        pathOptions={innerBounds ? redColor : whiteColor}
      />
    </>
  );
}

export default RectangleSomething;

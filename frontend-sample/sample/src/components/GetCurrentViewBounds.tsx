import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const GetCurrentViewBounds = () => {
  const map = useMap();
  const [viewNorthEastLat, setViewNorthEastLat] = useState(Number);
  const [viewNorthEastLng, setViewNorthEastLng] = useState(Number);
  const [viewSouthWestLat, setViewSouthWestLat] = useState(Number);
  const [viewSouthWestLng, setViewSouthWestLng] = useState(Number);
  console.log(
    viewNorthEastLat,
    viewNorthEastLng,
    viewSouthWestLat,
    viewSouthWestLng
  );
  useEffect(() => {
    if (!map) return;
    const updateBounds = () => {
      setViewNorthEastLat(map.getBounds().getNorthEast().lat);
      setViewNorthEastLng(map.getBounds().getNorthEast().lng);
      setViewSouthWestLat(map.getBounds().getSouthWest().lat);
      setViewSouthWestLng(map.getBounds().getSouthWest().lng);
    };

    updateBounds();
    map.on("zoomend", updateBounds);

    map.on("dragend", updateBounds);
    return () => {
      map.off("zoomend", updateBounds);
      map.off("dragend", updateBounds);
    };
  }, [map]);
  return null;
};
export default GetCurrentViewBounds;

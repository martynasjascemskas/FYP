import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

interface Bounds {
  coordinates: L.LatLng;
}
const GetCurrentViewBounds = () => {
  const map = useMap();
  const [currentBounds, setCurrentBounds] = useState<Bounds[]>([]);

  useEffect(() => {
    if (!map) return;
    const updateBounds = () => {
      const bounds: Bounds[] = [
        {
          coordinates: map.getBounds().getNorthEast(),
        },
        {
          coordinates: map.getBounds().getSouthWest(),
        },
      ];
      setCurrentBounds(bounds);
      console.log(bounds);
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

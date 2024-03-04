import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import "./geosearch.css";

// @ts-expect-error Javascript
const SearchControl = (props) => {
  const map = useMap();
  // @ts-expect-error Javascript
  useEffect(() => {
    // @ts-expect-error Javascript
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, props]);

  return null;
};
export default SearchControl;

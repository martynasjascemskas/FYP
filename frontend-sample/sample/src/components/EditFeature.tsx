import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const EditFeature = () => {
  // @ts-expect-error Javascript
  const _onCreated = (e) => {
    const type = e.layerType;
    const layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }

    console.log("Geojson", layer.toGeoJSON());
    console.log("coords", layer.getLatLngs());
    layer.bindPopup("hello").openPopup();
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

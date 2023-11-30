import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MyMap = () => {
  const mapRef = useRef(null); // Create a ref for the map container
  let map = useRef(null); // Ref to keep track of the actual map instance

  useEffect(() => {
    // Only initialize the map if it's not already created
    if (!map.current) {
      map.current = L.map(mapRef.current).setView([51.744498, -0.328599], 13);

      L.marker([51.744498, -0.328599]).addTo(map.current);
    }

    return () => {
      // Cleanup map on unmount
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MyMap;

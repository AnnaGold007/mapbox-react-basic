import React, { useRef, useEffect, useState } from 'react';
import Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import './Map.css';


Mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5uYWdvbGQwMDciLCJhIjoiY2t2bTNsajF2MWNiMDJ1dGtxM2lwOTZybSJ9.BvkgIPX-S7LrBwyqDMgiZw';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(36.300);
  const [lat, setLat] = useState(31.400);
  const [zoom, setZoom] = useState(6.6);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new Mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
    //  style: 'mapbox://styles/annagold007/ckvm8uwn90pnp15mgbl2bstt0',
      center: [lng, lat],
      zoom: zoom,
      logoPosition: 'bottom-left'
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
      polygon: true,
      trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon'
      });
      map.addControl(draw,'top-left');
       
    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      types: 'poi',
      // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
      render: function (item) {
      // extract the item's maki icon or use a default
      const maki = item.properties.maki || 'marker';
      return `<div class='geocoder-dropdown-item'>
      <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
      <span class='geocoder-dropdown-text'>
      ${item.text}
      </span>
      </div>`;
      },
      mapboxgl: Mapboxgl
      });
      map.addControl(geocoder);

    map.addControl(new Mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    
//  // change cursor to pointer when user hovers over a clickable feature
//     map.on('mouseenter', e => {
//       if (e.features.length) {
//         map.getCanvas().style.cursor = 'pointer';
//       }
//     });

//     // reset cursor to default when user is no longer hovering over a clickable feature
//     map.on('mouseleave', () => {
//       map.getCanvas().style.cursor = '';
//     });

//     // add tooltip when users mouse move over a point
//     map.on('mousemove', e => {
//       const features = map.queryRenderedFeatures(e.point);
//       if (features.length) {
//         const feature = features[0];

//         // Create tooltip node
//         const tooltipNode = document.createElement('div');
//         ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

//         // Set tooltip on map
//         tooltipRef.current
//           .setLngLat(e.lngLat)
//           .setDOMContent(tooltipNode)
//           .addTo(map);
//       }
//     });
  
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
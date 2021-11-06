import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Geocoder from 'mapbox-gl-geocoder'
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css'
//import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Tooltip from './components/Tooltip';
import ReactDOM from 'react-dom';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5uYWdvbGQwMDciLCJhIjoiY2t2bTNsajF2MWNiMDJ1dGtxM2lwOTZybSJ9.BvkgIPX-S7LrBwyqDMgiZw';

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));


  const [lng, setLng] = useState(36.300);
  const [lat, setLat] = useState(31.400);
  const [zoom, setZoom] = useState(6.6);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
    //  style: 'mapbox://styles/annagold007/ckvm8uwn90pnp15mgbl2bstt0',
      center: [lng, lat],
      zoom: zoom,
      logoPosition: 'bottom-left'
    });

    map.addControl(
      new Geocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      }),'top-right'
      );

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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
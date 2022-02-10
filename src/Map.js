import React, { useRef, useEffect, useState } from 'react';
import Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import './Map.css';
import * as turf from "@turf/turf";
import { MapboxLegendControl, LegendOptions } from "@watergis/mapbox-gl-legend";
import "@watergis/mapbox-gl-legend/css/styles.css";


Mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5uYWdvbGQwMDciLCJhIjoiY2t2bTNsajF2MWNiMDJ1dGtxM2lwOTZybSJ9.BvkgIPX-S7LrBwyqDMgiZw';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(36.300);
  const [lat, setLat] = useState(31.400);
  const [zoom, setZoom] = useState(6.6);
  const [rounded_area, setRounded_area] = useState(0);
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
       // point: true,
       // line_string:true,
        polygon: true,
        trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      //defaultMode: 'simple_select'
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

    map.on('load', () => {
          const layers = map.getStyle().layers;
          // Find the index of the first symbol layer in the map style
          let firstSymbolId;
          for (const layer of layers) {
              if (layer === 'symbol') {
                  firstSymbolId = layer.id;
                  break;
              }
          }

          map.addSource('urban-areas', {
              'type': 'geojson',
              'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
          });
          map.addLayer(
              {
                  'id': 'urban-areas-fill',
                  'type': 'fill',
                  'source': 'urban-areas',
                  'layout': {},
                  'paint': {
                      'fill-color': '#f08',
                      'fill-opacity': 0.4
                  }
// This is the important part of this example: the addLayer
// method takes 2 arguments: the layer as an object, and a string
// representing another layer's name. if the other layer
// exists in the stylesheet already, the new layer will be positioned
// right before that layer in the stack, making it possible to put
// 'overlays' anywhere in the layer stack.
// Insert the layer beneath the first symbol layer.
              },
              firstSymbolId
          );


        const targets = {
            pipeline: "Pipeline",
            pipeline_annotation: "Pipeline Label",
            meter: "Water Meter",
            "flow meter": "Flow Meter",
            valve: "Valve",
            firehydrant: "Fire Hydrant",
            washout: "Washout",
            tank: "Tank",
            tank_annotation: "Tank Label",
            wtp: "WTP",
            wtp_annotation: "WTP Label",
            intake: "Intake",
            intake_annotation: "Intake Label",
            parcels: "Parcels",
            parcels_annotation: "Parcels Label",
            village: "Village",
            village_annotation: "Village Label",
            dma: "DMA",
            "dma-annotation": "DMA Label",
            "contour-line": "Countour",
            "contour-label": "Contour Label",
            hillshade: "Hillshade",
            'urban-areas-fill': 'urban-areas-fill'
        };

        map.addControl(new MapboxLegendControl(targets), "top-right");

    });

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

      function updateArea(e) {
          const data = draw.getAll();
          const answer = document.getElementById('calculation-box');
          if (data.features.length > 0) {
              const area = turf.area(data);
            // Restrict the area to 2 decimal points.
              const r_area = Math.round(area * 100) / 100;
              setRounded_area(r_area.toFixed(2));
          } else {map.getZoom()

              if (e.type !== 'draw.delete')
                  setRounded_area(0);
          }
      }
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps





  return (
    <div>
       <div class="calculation-box">
          <p>Area: {rounded_area} square meters</p>
        </div>
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
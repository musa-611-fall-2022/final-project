/* =============================================================
This script contains functions dealing with the map
=============================================================== */

// Arr that store map style quintile breaks
let quintiles = [];

/**
 * 
 * @param {Number} val representing a value to be color coded 
 * @returns {String} hex of the output color
 */
function getQuintileColor(val) {
  return val > Number(quintiles[4]) ? '#353797' :
         val > Number(quintiles[3]) ? '#5557c3' :
         val > Number(quintiles[2]) ? '#8e8fd7' :
         val > Number(quintiles[1]) ? '#c6c7eb' :
                                      '#ffffff';
}

// Sets quintile display styles
/**
 * 
 * @param {Object.Feature} feature geo feature
 * @returns {Object} styling options
 */
function quintileStyle(feature) {
  return {
    fillColor: getQuintileColor(feature.properties.mapDisplayVal),
    color: "white",
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.7,
  }
}

// Initializes map with empty block group layer on screen, and returns map obj
/**
 * 
 * @returns {Object} Map
 */
function initMap() {
  const map = L.map('map', { 
    maxZoom: 22, preferCanvas: true, 
    zoomControl: false,
    tap: false, // Prevent firing two onclick events at once
  }).setView([39.98, -75.16], 11.5);

  // MapBox credentials
  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';

  const attributionHTML = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const tileLayerUrl = `https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`;
  
  // Add tile layer
  L.tileLayer(tileLayerUrl, {
      maxZoom: 21,
      attribution: attributionHTML,
  }).addTo(map);

  // Change attribution position
  L.control.attribution({
    position: 'topright',
  }).addTo(map);

  // Initialize polygon layer for later
  map.blockGroupLayer = L.geoJSON(null, {
    style: {
      fillColor: "#c8b7d9",
      color: "white",
      weight: 1,
      dashArray: '3',
      fillOpacity: 0.5,
    },
  })
  .addTo(map);

  return map;
}

// Goes through map base data and remove those with pop < 100
function filterBlockGroups(mapData) {
  const filteredData = mapData;
  for(let i = 0; i < mapData.features.length; i++) {
    if(mapData.features[i].properties.population < 100) {
      mapData.features.splice(i, 1);
    }
  }
  return filteredData;
}

// Feteches map data from local directory
async function fetchMapBaseData() {
  const resp = await fetch('./data/block-group-population.geojson');
  const mapData = await resp.json();
  return mapData;
}

// Add block groups in the first go, before fetching data from the database
/**
 * 
 * @param {Object} map the leaflet map
 * @param {Object.FeatureCollection} mapBaseData block group feature collection
 */
async function addBlockGroups(map, mapBaseData) {
  try {
    mapBaseData = await fetchMapBaseData();
    map.blockGroupLayer.addData(mapBaseData);
    console.log(mapBaseData);
  } catch(err) {
    console.log(err);
  }
}

import { map } from './main.js';

// Merges data gotten from API to map base data
function mergeAttributeToMapData(mapBaseData, updateData, key) {
  const mapBaseDataUpdated = {
    type: 'FeatureCollection',
    crs: mapBaseData.crs,
    features: [],
  }
  for(const feature of mapBaseData.features) {
    feature.properties.mapDisplayVal = 0;
    for(let i = 0; i < updateData.length; i++) {
      const entry = updateData[i];
      if(String(entry.geoid) === String(feature.properties.GEOID10)) { // If matched
        // Update
        feature.properties.mapDisplayVal = entry[key];
        mapBaseDataUpdated.features.push(feature);
        // get this out of the arr to make later processes faster
        updateData.splice(i, 1);
        break;
      }
    }
    if(feature.properties.mapDisplayVal == undefined) {
      feature.properties.mapDisplayVal = null;
    }
  }
  return mapBaseDataUpdated;
}

// Computes quintile breakpoints
function computeQuintiles(dataArr, ntiles) {
  const quintiles = [];
  // First turn object into array
  const ascArr = dataArr.sort((a, b) => a - b);
  const sectionLength = ascArr.length / ntiles;
  
  // Add the min
  quintiles.push(ascArr[0]);

  // Add the mid ntile-1 values
  for(let i = 1; i < ntiles; i++) {
    const thisLocation = Math.round(sectionLength * i) - 1;
    quintiles.push(ascArr[thisLocation]);
  }

  // Add the final one
  quintiles.push(ascArr[ascArr.length - 1]);
  return quintiles;
}

// Makes tooltip content (hover)
function makeTooltipContent(feature, key) {
  const GEOID = feature.properties.GEOID10;
  const population = feature.properties.population;
  const displayVal = Math.round(feature.properties.mapDisplayVal, 2);
  const percentSign = key === 'ratio' ? '%' : '';
  return `<strong class="italic">geoid:</strong>${GEOID}<br />
          <strong class="italic">population: </strong>${population}<br />
          <strong class="italic">${key}: </strong>${displayVal}${percentSign}`;
}

// Import object storing geoselection info
import { geoSelection } from './main.js';

// Selects block group geo [Three Functions]
function onLayerSelected(layer) {
  // Store the GEOID
  geoSelection.selected.push(layer.feature.properties.GEOID10);
  // Set layer style
  layer.setStyle({
    weight: 5,
    dashArray: null,
  });
}
function onLayerUnselected(layer) {
  // Un-store the GEOID
  geoSelection.selected.splice(geoSelection.selected.indexOf(layer.feature.properties.GEOID10));
  // Revert style
  layer.setStyle({
    weight: 1,
    dashArray: '3',
  });
}
function onLayerClicked(layer) {
  if(!geoSelection.selected.includes(layer.feature.properties.GEOID10)) {
    // If currently not selected, select
    onLayerSelected(layer);
  } else {
    // Otherwise, unselect
    onLayerUnselected(layer);
  }
  console.log(geoSelection);
}

// Creates a data that joins information fetched from API to base map
// Then, add event listeners to
// But first, create a date-time object
// ---- Bug with leaflet: each click generates two clicks
// ---- Bug fix: see if this click is at least some time away from the last click
let currentTime = 0;
function makeDisplayData(mapBaseData, mapUpdateData) {
  // First update mapUpdateData
  mapUpdateData.map(item => {
    item.geoid = '42101' + String(item.geoid);
  })

  // Copy a version
  const updateData = mapUpdateData.slice();

  // Get the key name of updateData (count, avg, or else)
  const key = Object.keys(updateData[0])[1];
  console.log('map update data', updateData);

  // Merge info back to map base data
  const mapBaseDataUpdated = mergeAttributeToMapData(mapBaseData, updateData, key);

  // Get quintiles of display data || Update the global arr
  quintiles = computeQuintiles(
    mapBaseDataUpdated.features.map(item => item.properties.mapDisplayVal),
    5,
  );
  console.log(quintiles);

  map.blockGroupLayer.clearLayers();
  map.blockGroupLayer.addData(mapBaseDataUpdated);
  map.blockGroupLayer.setStyle(quintileStyle);
  map.blockGroupLayer.bindTooltip(layer => {
    const displayContent = makeTooltipContent(layer.feature, key);
    return displayContent;
  })
  .addEventListener('click', (e) => {
    // Check if in selection state || if so:
    if(geoSelection.inSelection === false) return;
    // Check if this click is following right after the last click
    if(Number(Date.now()) - currentTime < 10) return;
    currentTime = Number(Date.now());

    onLayerClicked(e.layer);
  })
}

export {
  initMap,
  addBlockGroups,
  fetchMapBaseData,
  makeDisplayData,
};
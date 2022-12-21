/* =============================================================
This script contains functions dealing with the map
=============================================================== */

/**
 *
 * @param {Number} val representing a value to be color coded
 * @returns {String} hex of the output color
 */
function getQuintileColor(val, quintiles) {
  return val > Number(quintiles[4]) ? '#353797' :
         val > Number(quintiles[3]) ? '#5557c3' :
         val > Number(quintiles[2]) ? '#8e8fd7' :
         val > Number(quintiles[1]) ? '#c6c7eb' :
                                      '#e0e0f0';
}

// Sets quintile display styles
/**
 *
 * @param {Object.Feature} feature geo feature
 * @returns {Object} styling options
 */
function quintileStyle(feature, quintiles) {
  return {
    fillColor: getQuintileColor(feature.properties.mapDisplayVal, quintiles),
    color: "white",
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.7,
  };
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
  }).addTo(map);

  // Initialize selected layer
  map.selectedLayer = L.geoJSON(null, {
    style: {
      fillColor: null,
      color: "white",
      weight: 3,
      dashArray: '3',
      fillOpacity: 0,
    },
    interactive: false,
  }).addTo(map);

  // Initialize origin filter layer
  map.originFilterLayer = L.geoJSON(null, {
    style: {
      fillColor: null,
      color: 'white',
      weight: 5,
      dashArray: '7',
      fillOpacity: 0,
    },
    interactive: false,
  }).addTo(map);

  // Initialize destination filter layer
  map.destinationFilterLayer = L.geoJSON(null, {
    style: {
      fillColor: null,
      color: 'white',
      weight: 5,
      dashArray: null,
      fillOpacity: 0,
    },
    interactive: false,
  })
  .addTo(map);

  return map;
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
async function addInitialBlockGroups(map, mapBaseData) {
  try {
    mapBaseData = await fetchMapBaseData();
    map.blockGroupLayer.addData(mapBaseData);
  } catch(err) {
    console.log(err);
  }
}

// Merges data gotten from API to map base data
/**
 *
 * @param {Object.FeatureCollection} mapBaseData map block group base shapes
 * @param {Array} updateData array of objects containing GEOID and count/avg/sum, queried from db
 * @param {String} key either count or avg or sum
 * @returns
 */
function mergeAttributeToMapData(mapBaseData, updateData, key) {
  // Initiate new FeatureCollection
  const mapBaseDataUpdated = {
    type: 'FeatureCollection',
    crs: mapBaseData.crs,
    features: [],
  };
  for(const feature of mapBaseData.features) {
    feature.properties.mapDisplayVal = 0;
    for(let i = 0; i < updateData.length; i++) {
      const entry = updateData[i];
      if(String(entry.geoid) === String(feature.properties.GEOID10)) { // If matched
        // Update
        feature.properties.mapDisplayVal = entry[key];
        // Add to new FeatureCollection
        mapBaseDataUpdated.features.push(feature);
        // get this out of the arr to make later processes faster
        updateData.splice(i, 1);
        break;
      }
    }
  }
  return mapBaseDataUpdated;
}

// Computes quintile breakpoints
/**
 *
 * @param {Arr} dataArr simple array of all the numbers/values
 * @param {Number} ntiles
 * @returns {Arr} Array of `ntiles + 1`, with the 0-index value being the min, and the ntile-index value bing the max
 */
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
  return `
    <div>
      <div><strong class="italic">geoid:</strong>${GEOID}</div>
      <div><strong class="italic">population: </strong>${population}</div>
      <div><strong class="italic">${key}: </strong>${displayVal}${percentSign}</div>
    </div>
`;
}
// Make popup content
/**
 *
 * @param {Object.Feature} feature the input feature object
 * @param {String} key display type: count, sum, or mean
 * @returns {text} HTML content of the tooltip
 */
function makePopupContent(feature, key) {
  return `
    ${makeTooltipContent(feature, key)}
    <button class="geo-select-button select-origin-button">Filter origins to selected</button>
    <button class="geo-select-button select-destination-button">Filter destinations to selected</button>
    <button class="geo-select-button reset-geo-select-button">Reset location filter</button>
`;
}

// Import object storing geoselection info
import { geoSelection, filterParams } from './main.js';

// Selects block group geo [Three Functions]

// Adds an array of features to a map layer
/**
 *
 * @param {Layer} mapLayer
 * @param {Arr} featuresArr
 */
function addFeaturesArrToLayer(mapLayer, featuresArr) {
  featuresArr.forEach(feature => {
    mapLayer.addData(feature);
    mapLayer.bringToFront();
  });
}

// Clears currently selected layer and clear `geoSelection`
function clearSelected(map) {
  map.selectedLayer.clearLayers();
  geoSelection.selected = [];
  geoSelection.selectedFeatures = [];
}

// Clear geo filters (on the map and in `filterParams`)
function clearAllGeoFilters(map) {
  map.originFilterLayer.clearLayers();
  map.destinationFilterLayer.clearLayers();

  filterParams.categoricalVars.destination_geoid.isApplied = false;
  filterParams.categoricalVars.destination_geoid.selectedCategories = [];
  filterParams.categoricalVars.origin_geoid.isApplied = false;
  filterParams.categoricalVars.origin_geoid.selectedCategories = [];
}

import { onConfirmButtonClick } from './main.js';

// Make buttons in the popup (geofilters) functional
// 1. Add currently selected to Origin filter
// 2. Add currently selected to Destination filter
// 3. Clear current geo-filters
/**
 *
 * @param {*} map
 */
function functionalizeGeoFilterButtons(map) {
  // add selected features as Origin filter
  const originSelectButtonEl = document.querySelector('.select-origin-button');
  originSelectButtonEl.addEventListener('click', function applyOriginFilter() {
    map.originFilterLayer.clearLayers();
    addFeaturesArrToLayer(map.originFilterLayer, geoSelection.selectedFeatures);

    // Add selection to `filterParams
    filterParams.categoricalVars.origin_geoid.isApplied = true;
    filterParams.categoricalVars.origin_geoid.selectedCategories = geoSelection.selected.map(item => item.substring(5));
    console.log(filterParams);

    // Close popup
    map.closePopup();

    // Clear current selection
    clearSelected(map);

    // Directly apply filter
    onConfirmButtonClick();
  });

  // add selected features as Destination filter
  const destinationSelectButtonEl = document.querySelector('.select-destination-button');
  destinationSelectButtonEl.addEventListener('click', function applyDestinationFilter() {
    map.destinationFilterLayer.clearLayers();
    addFeaturesArrToLayer(map.destinationFilterLayer, geoSelection.selectedFeatures);

    // Add selected to `filterParams`
    filterParams.categoricalVars.destination_geoid.isApplied = true;
    filterParams.categoricalVars.destination_geoid.selectedCategories = geoSelection.selected.map(item => item.substring(5));
    console.log(filterParams);

    // Close popup
    map.closePopup();

    // Clear current selection
    clearSelected(map);

    // Directly apply filter
    onConfirmButtonClick();
  });

  // clear all current filters
  const resetGeoSelectButtonEl = document.querySelector('.reset-geo-select-button');
  resetGeoSelectButtonEl.addEventListener('click', ( ) => {
    clearAllGeoFilters(map);
    // Clear current selection
    clearSelected(map);

    // Apply filter
    onConfirmButtonClick();

    // Close popup
    map.closePopup();
  });
}

// layer unselected -> selected
/**
 *
 * @param {*} map
 * @param {*} layer
 */
function onLayerSelected(map, layer) {
  // Store the GEOID
  geoSelection.selected.push(layer.feature.properties.GEOID10);
  geoSelection.selectedFeatures.push(layer.feature);

  // Add layer to selected layer
  map.selectedLayer.addData(layer.feature);
  map.selectedLayer.bringToFront();

  // Open the popup
  layer.openPopup();

  // Add event listeners to the popup
  functionalizeGeoFilterButtons(map);
}
// layer selected -> unselected
/**
 *
 * @param {*} map
 * @param {*} layer
 */
function onLayerUnselected(map, layer) {
  // Un-store the GEOID
  const indexToSplice = geoSelection.selected.indexOf(layer.feature.properties.GEOID10);
  geoSelection.selected.splice(indexToSplice);
  geoSelection.selectedFeatures.splice(indexToSplice);

  // Remove from selected layer by first clearing the layer then re-add
  map.selectedLayer.clearLayers();
  addFeaturesArrToLayer(map.selectedLayer, geoSelection.selectedFeatures);
  map.closePopup();

}

// ---- Bug with leaflet: each click generates two clicks
// ---- Bug fix: see if this click is at least some time away from the last click
let currentTime = 0;

// prevents from clicking twice
// determines whether to use `onLayerSelected` or `onLayerUnselected`, and uses that
function addGeoSelector(map, layer) {
  // Check if this click is following right after the last click
  if(Number(Date.now()) - currentTime < 10) return;

  currentTime = Number(Date.now());

  if(!geoSelection.selected.includes(layer.feature.properties.GEOID10)) {
    // If currently not selected, select
    onLayerSelected(map, layer);
  } else {
    // Otherwise, unselect
    onLayerUnselected(map, layer);
  }
  console.log(geoSelection);
}

// Creates a data after API fetch, used to update map
/**
 *
 * @param {Object.FeatureCollection} mapBaseData geo object base
 * @param {Array} mapUpdateData object queried from db; array; each element is an object with two properties 1. GEOID, 2. count/avg/sum
 * @returns {Object} mapData: shape to be displayed on map; key: count/avg/sum; quintiles: Arr
 */
function makeDisplayData(mapBaseData, mapUpdateData) {
  // First update mapUpdateData, add `42101` in front of the GEOID
  mapUpdateData.map(item => {
    item.geoid = '42101' + String(item.geoid);
  });

  // Copy a version
  const updateData = mapUpdateData.slice();
  // Get the key name of updateData (count, avg, or else)
  const key = Object.keys(updateData[0])[1];
  // Merge info back to map base data
  const mapBaseDataUpdated = mergeAttributeToMapData(mapBaseData, updateData, key);

  // Get quintiles of display data || Update the global arr
  const quintiles = computeQuintiles(mapBaseDataUpdated.features.map(item => item.properties.mapDisplayVal), 5);

  return {
    mapData: mapBaseDataUpdated,
    key: key,
    quintiles: quintiles,
  };
}

// Updates map after API fetch
/**
 *
 * @param {Leaflet Map} map
 * @param {Object.FeatureCollection} mapData
 * @param {Arr} quintiles
 * @param {String} key
 */
function updateMap(map, mapData, quintiles, key) {
  // Update the block group layer
  map.blockGroupLayer.clearLayers();
  map.blockGroupLayer.addData(mapData);
  // Set overall styling
  map.blockGroupLayer.setStyle(feature => quintileStyle(feature, quintiles));

  // Add tooltip and popup
  map.blockGroupLayer.bindTooltip(layer => makeTooltipContent(layer.feature, key));
  map.blockGroupLayer.bindPopup(layer => makePopupContent(layer.feature, key));

  // Add geo selector event listener
  map.blockGroupLayer.addEventListener('click', (e) => {
    addGeoSelector(map, e.layer);
  });

  // Bring filter layers to front
  map.originFilterLayer.bringToFront();
  map.destinationFilterLayer.bringToFront();
}

export {
  initMap,
  addInitialBlockGroups,
  fetchMapBaseData,
  makeDisplayData,
  updateMap,
  clearAllGeoFilters,
  clearSelected,
};
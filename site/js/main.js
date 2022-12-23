// Tree Inventory Surveying App
// ============================

// The _main.js_ module defines the primary functionality of the app, and serves
// as the cross-component coordinator. Additional functionality is found in
// individual component modules:
// * [map.js](map.html) for behavior related to the map
// * [tree-info-form.js](tree-info-form.html) for form behavior
// * [toast.js](toast.html) for the messages that get shown temporarily
// * [inventory.js](inventory.html) for functions governing the loading/saving
//   of tree inventory and notes

import { initMap, updateSelectedCountyPositionOn, updateUserPositionOn } from './map.js';
import { initHouseInfoForm, showHouseDataInForm } from './house-info-form.js';
import { initToast, showToast } from './toast.js';
import { downloadInventory, loadNotes, saveNotes } from './inventory.js';
import url from '../data/url.js';
import counties from '../data/PA.js';

let countyFilter = document.querySelector('#county-name-input');

function getFilteredCounty() {
  let filteredCounty = counties;


  // Filter based on county name
  const text = countyFilter.value;
  console.log(text);
  console.log(filteredCounty);
  for (let i = 0; i < counties['features'].length; i++) {
    let name = counties['features'][i]['properties']['COUNTY_NAME'].toLowerCase();
    let geo;
    if (text === name) {
       geo = counties['features'][i]['geometry'];
       console.log(geo);
       return {
        "type":"Feature",
        "name": "Pennsylvania_County_Boundaries",
        "properties": counties['features'][i]['properties'],
        "geometry":counties['features'][i]['geometry'] };
    }
  }

  /*filteredCounty = filteredCounty.filter(function (county) {
    const name = county['COUNTY_NAME'].toLowerCase();
    const hasText = name.includes(text);
    return hasText;
  });

  return filteredStops;*/
}

let app = {
  currentHouse: null,
  notes: JSON.parse(localStorage.getItem('notes') || '{}'),
};

const loadOverlayEl = document.getElementById('load-overlay');
const map = initMap();

// Define event handlers
// ---------------------

// `onInventoryLoadSuccess` will be called if and when `downloadInventory`
// function completes the download of the tree inventory file successfully.
function onInventoryLoadSuccess(data) {
  map.houseLayer.addData(data);
  loadOverlayEl.classList.add('hidden');
}

// `onSaveClicked` will be called if and when the save button on the tree info
// form is clicked.
function onSaveClicked(evt) {
  const note = evt.detail.note;
  const houseId = app.currentHouse.properties['OBJECTID'];
  app.notes[houseId] = note;

  saveNotes(app.notes);
  showToast('Saved!', 'toast-success');
}

// `onTreeSelected` will be called if and when the user clicks on a tree on the
// map.
function onHouseSelected(evt) {
  const house = evt.detail.house;
  app.currentHouse = house;

  const houseId = house.properties['OBJECTID'];
  const notes = app.notes[houseId] || '';
  showHouseDataInForm(house, notes);
}

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when the user's position is successfully found.
function onUserPositionSuccess(pos) {
  updateUserPositionOn(map, pos);
}

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when there is an error in finding the user's position.
function onUserPositionFailure(err) {
  console.log(err);
}

// Define global interface setup
// -----------------------------
// Most setup function belong in one component or another. However, there is
// always some setup that doesn't belong to any specific component of your
// application. Here we set up events that have cross-component implications,
// for which we have defined handlers above.

function setupGeolocationEvent() {
  navigator.geolocation.getCurrentPosition(
    onUserPositionSuccess,
    onUserPositionFailure,
  );
}

function setupInteractionEvents() {
  window.addEventListener('house-selected', onHouseSelected);
  window.addEventListener('save-clicked', onSaveClicked);
}

let currentListData;

// When click the "Load List" button, load the address
// $("#voterFileLoadButton").click(function() {
//   let listName = document.querySelector('#stop-name-input').value;
//   for(let i=0; i < 67 ; i++){
//   if(url.features[0].properties.COUNTY_NUMBER == listName) {
//   currentListData = url.features[i];}}
//   showCountyLocation(currentListData);
//   return currrentListData;
// } );

window.currentListData = currentListData;

//reset the view of the map based on the county name
countyFilter.addEventListener('input', () => {
  const filteredCounty = getFilteredCounty();
  console.log(filteredCounty);
  updateSelectedCountyPositionOn(map, filteredCounty);
});

// Initialize the app components and events
// ----------------------------------------
//
// Set up the various components of the application, and any events that should
// be initialized. Note that setting up the interaction events is postponed
// until the notes are loaded from the remote data store, because we don't want
// our user to be able to load/save any data before we actually have the
// existing data loaded.

initToast();
initHouseInfoForm();
setupGeolocationEvent();
setupInteractionEvents();


loadNotes(notes => {
  app.notes = notes;
});
downloadInventory(onInventoryLoadSuccess);

window.app = app;
window.url = url;
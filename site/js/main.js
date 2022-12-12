
import { initMap, updateUserPositionOn } from './map.js';
import { initHouseInfoForm, showHouseDataInForm } from './house-info-form.js';
import { initToast, showToast } from './toast.js';
import { downloadInventory, loadNotes, saveNotes } from './inventory.js';



let app = {
  currentHouse: null,
  notes: null,
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

loadNotes(notes => {
  app.notes = notes;
  setupInteractionEvents();
});
downloadInventory(onInventoryLoadSuccess);

window.app = app;
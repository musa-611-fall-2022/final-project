

  import { showgalleryDataInForm } from './galleryinfo.js';
  import { initMap, updateUserPositionOn } from './map.js';
  import { downloadgalleries } from './position.js';
  import{ showcommentinform, getFormContent, savenote, loadcomments }from './comment.js';
  import { initToast, showToast } from './toast.js';
  let app;
  window.app=app;

function apparray(){
  app = {
    currentgallery: null,
    notes:null,
  };
  let arr=Array.apply(null, { length:917 });
  app.notes=arr;
return app;
}
apparray();

const savecommentEl = document.getElementById('savebutton');
const loadOverlayEl = document.getElementById('load-overlay');
let baseMap = initMap();
window.baseMap=baseMap;

function updateselectedgalleryPositionOn(gallery) {
  baseMap.selectedLayer.addData({
    'type': 'Point',

    'coordinates': [gallery.geometry[0], gallery.geometry[1]],
  });
  /*let lnglat=gallery.geometry['coordinates'];
  let longitude=Number(lnglat.split(",")[0]);
  let latitude=Number(lnglat.split(",")[1]);*/
  baseMap.setView([gallery.geometry[1], gallery.geometry[0]], 10);
}

  // `ongalleriesLoadSuccess` will be called if and when `downloadgalleries`
// function completes the download of the gallery file successfully.
function ongalleriesLoadSuccess(data) {
    baseMap.galleryLayer.addData(data);
    loadOverlayEl.classList.add('hidden');
  }

// `onNoteSaveSuccess` will be called if and when the notes have been saved
// to the cloud successfully.
function onNotesSaveSuccess() {
  showToast('Saved!', 'toast-success');
}

// `on⭐Clicked` will be called if and when the save button on the tree info
// form is clicked.
function onSaveClicked() {
  const content = getFormContent();
  const galleryID = app.currentgallery.properties['ID'];

  savenote(galleryID, content, app, onNotesSaveSuccess);
}

// `ongallerySelected` will be called if and when the user clicks on a gallery on the
// map.
function ongallerySelected(evt) {
    const gallery = evt.layer.feature;
    app.currentgallery = gallery;
    showgalleryDataInForm(gallery);
    showcommentinform(gallery, app);
  }

  //read the file by name and then input

  function onUserPositionSuccess(pos) {
    updateUserPositionOn(baseMap, pos);
  }

  // **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when there is an error in finding the user's position.
function onUserPositionFailure(err) {
    alert(`Oh man, we just failed to find the user's position: ${err}`);
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
    baseMap.galleryLayer.addEventListener('click', ongallerySelected);
    savecommentEl.addEventListener('click', onSaveClicked);
  }


  downloadgalleries(ongalleriesLoadSuccess);
  setupInteractionEvents();
  setupGeolocationEvent();

  loadcomments(notes => {
    app.notes = notes;
  });
  initToast();

  export{
    updateselectedgalleryPositionOn,
  };
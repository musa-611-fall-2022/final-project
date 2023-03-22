/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-12-10 06:41:25
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-13 11:18:31
 * @FilePath: \final-project\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { initMap, showFonMap } from './map.js';
import { app } from './map.js';

const map = initMap();
let search = document.querySelector('#showlocation');
let facilities = document.querySelector('#name');
let directionButton = document.querySelector('#direction');

function hidePopUp() {
  let popup = document.getElementById("popup");
  let mapafter = document.getElementById("map");
  popup.classList.remove("open-popup");
  mapafter.classList.remove("mapafter");
}

function Search(map, search, facilities){
search.addEventListener('click', () => {
  let f=facilities.value;
  showFonMap(map, f);
  hidePopUp();
  if (map.routingControl !== undefined){
    map.removeControl(map.routingControl);
    }
});
}

function updateUserPositionOn(map, pos) {
  map.positionLayer.addData({
    'type': 'Point',
    'coordinates': [pos.coords.longitude, pos.coords.latitude],
  });
  map.setView([pos.coords.latitude, pos.coords.longitude], 18);
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


//setupGeolocationEvent();
function setupGeolocationEvent() {
  navigator.geolocation.getCurrentPosition(
    onUserPositionSuccess,
    onUserPositionFailure,
  );
}


function fakePosition(map) {
    const pos={
        "type": "Feature",
        "geometry":
              {   "type": "Point",
                  "coordinates":[-1.263591, 36.858131] },
      };
    map.positionLayer.addData(pos);
    map.setView([ -1.263591, 36.858131], 16);
    const marker = new L.Marker([-1.263591, 36.858131]);
    marker.addTo(map);
}

function shortestRoute() {
  map.removeLayer(map.FLayer);
  map.routingControl = L.Routing.control({
    waypoints: [
      L.latLng(-1.263591, 36.858131),
      L.latLng(    app.currentFac.geometry.coordinates['1'], app.currentFac.geometry.coordinates['0']),
    ],
  }).addTo(map);
}

function getDirection() {
  directionButton.addEventListener('click', ()=>{
    shortestRoute();
    hidePopUp();
  });
}





//Execute functions
setupGeolocationEvent();
fakePosition(map);
Search(map, search, facilities);
getDirection();
window.map = map;







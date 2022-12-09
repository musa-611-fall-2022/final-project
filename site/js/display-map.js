/* =============================================================
This script contains functions dealing with the map
=============================================================== */

function initMap() {
  const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

  // MapBox credentials
  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';

  L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
      maxZoom: 19,
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);

  return map;
}

function test() {
  console.log("test");
}

export {
  initMap,
  test,
};
//AAA accessible color palette
//const pear = '#bcd434';
const mindaro = '#e4f481';
const mustardGreen = '#6b752f';
const blueYonder = '#5a7a9a';
//const blackShadows = '#bcb0aa';
//const blackOlive = '#3c3c34';

function initMap(){
    let philaMap = L.map('phila-map').setView([40, -75.2], 10);
  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  //user must create their own mapbox token and insert here
  const mapboxToken = "pk.eyJ1Ijoic29maWFmYXN1bGxvIiwiYSI6ImNsYmNldm16ZTBiaHEzcHMxMmVyY3p6bmQifQ.GJXZmvRSGQjVTIl0976dKw";
  L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
      maxZoom: 19,
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(philaMap);

  //create null layers
  philaMap.restaurantsLayer = L.geoJSON(null, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      fillColor: blueYonder,
      fillOpacity: 0.3,
      stroke: false,
    },
  }).bindTooltip(layer => {
    return layer.feature.properties['name'];
  }).addTo(philaMap);

  philaMap.farmersMarketsLayer = L.geoJSON(null, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      fillColor: mustardGreen,
      fillOpacity: 0.3,
      stroke: false,
    },
  }).bindTooltip(layer => {
    return layer.feature.properties['NAME'];
  }).addTo(philaMap);

  philaMap.picnicsLayer = L.geoJSON(null, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      fillColor: mindaro,
      fillOpacity: 0.3,
      stroke: false,
    },
  }).bindTooltip(layer => {
    return layer.feature.properties['park_name'];
  }).addTo(philaMap);

  return philaMap;
  }


export {
    initMap,
};
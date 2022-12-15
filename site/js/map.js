import somervilleBoundaries from '../data/COSBoundaries.js';

function initializeSiteMap() {
    let siteMap = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([42.388526, -71.103495], 13.35); // made map global so that other functions can addTo 'map'
    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'dark-v11';
    const mapboxToken = 'pk.eyJ1IjoibW9yZ2FuZ3IiLCJhIjoiY2w4dzF2bHZsMDJqdDN3czJwOGg0ZXBsbSJ9.tXRhvJAL-t7cJCrCyAEhUw';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 30,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(siteMap);

    const boundaries = L.geoJSON(somervilleBoundaries, {
      style: { fill:null, color: 'whitesmoke' },
    }).addTo(siteMap);

    return siteMap;
  }


function makeSiteFeature(site)  {
  return {
    "type": "Feature",
    "properties": {
      "image": site["image"],
      "challenge": site["challenge"],
      "name": site["name"],
      "neighborhood": site["neighborhood"],
      "foundby": site["foundby"],
      "description": site["description"],
      "yearadded": site["yearadded"],
      "additionalinformation": site["additionalinformation"],
    },
    "geometry": site['geom'],
  };
}

function showSitesOnMap(sitesToShow, siteMap) {
  if(siteMap.siteLayers !== undefined) {
  siteMap.removeLayer(siteMap.siteLayers);
  }

  const siteFeatureCollection = {
  "type": "FeatureCollection",
  "features": sitesToShow.map(makeSiteFeature),
};

//function featureStyle(feature) {
 // const challengeColors = {
    //"Ghost Ads": "#217e79",
    //"Murals": "#008096",
   // "Monuments": "#237DAD",
    //"Reliefs": "#6475B4",
   // "Historic Houses": "#9769A8",
   // "Historic Curios": "#BA5E8A",
 // };
  //const challengeFeature = feature.properties["challenge"];
  //return {
   // fillColor: challengeColors[challengeFeature]
   // stroke: true,
   // color: '#000000',
    //weight: 1,
   // fillOpacity: 1,
    //radius: 6}
//};

siteMap.siteLayers = L.geoJSON(siteFeatureCollection, {
  pointToLayer:(geoJsonPoint, latlng) => L.circleMarker(latlng),
  style: {
    fillColor: '#6475B4',
    stroke: true,
    color: 'whitesmoke',
    weight: 1,
    fillOpacity: 1,
    radius: 6,
    },
  onEachFeature: function(feature, layer) {
    layer.bindPopup('<img src='+ feature.properties.image+' + class= "popup-image" >' +
    "<b>Challenge:</b> " + feature.properties.challenge +
    "</br><b>Site Name:</b> " + feature.properties.name +
    "</br><b>Neighborhood:</b> " + feature.properties.neighborhood +
    "</br><b>Found By:</b> " + feature.properties.foundby +
    "</br><b>Description:</b> " + feature.properties.description +
    "<br><a href='" + feature.properties.additionalinformation + "'>More Info</a>");
},
  })
.addTo(siteMap);
}



export {
    initializeSiteMap,
    showSitesOnMap,
};

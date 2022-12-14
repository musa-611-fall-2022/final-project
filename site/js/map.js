
function onHouseClicked(evt) {
  console.log(evt);
  const house = evt.layer.feature;
  
  const houseSelectedEvent = new CustomEvent('house-selected', { detail: { house } });
  window.dispatchEvent(houseSelectedEvent);
}



function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 10);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'satellite-v9';
    const mapboxToken = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    
    map.houseLayer = L.geoJSON(null, {
      /*pointToLayer: (feature, latlng) => L.circleMarker(latlng),
      style: {
        fillColor: '#942929',
        fillOpacity: 0.9,
        stroke: true,
    
      },*/
                       
      pointToLayer: function (feature, latlng) {
        /*var geojsonMarkerOptions = {fillColor: '#942929',
        fillOpacity: 0.9,
        stroke: true};*/
        var popup = L.popup().setContent("position: " + latlng+ "<br>"+"Name:"+feature.properties['RESNAME']);
        var houseIcon = L.icon({
          iconUrl: 'images/house-icon.png',
               
          iconSize:     [30,30], // size of the icon
          iconAnchor:   [0,0], // point of the icon which will correspond to marker's location
          popupAnchor:  [14,-10], // point from which the popup should open relative to the iconAnchor
          
      });
        var marker = L.marker(latlng, {icon: houseIcon});
        marker.bindPopup(popup);
        return marker;               
     }
     
      
          })
    .addTo(map)
 
    
    /*
    function onEachFeature(feature, layer) {
  
      layer.bindPopup("Name: " + feature.properties['RESNAME'] + "<br>" + "City: " + feature.properties['City']);
  }   */

  
    map.houseLayer.addEventListener('click', onHouseClicked);
    
    map.positionLayer = L.geoJSON(null).addTo(map);

   /* map.popupLayer = L.geoJSON(null,{onEachFeature: onEachFeature}).addTo(map);*/

    return map;
  }

  


  function updateUserPositionOn(map, pos) {
    map.positionLayer.addData({
      'type': 'Point',
      'coordinates': [pos.coords.longitude, pos.coords.latitude],
    });
    map.setView([pos.coords.latitude, pos.coords.longitude], 17);
  }
  
  export {
    initMap,
    updateUserPositionOn,
  };
//click on a facility on a map, and then sends the data to other parts of the code to be used as needed.
function onFClicked(evt) {
    console.log(evt);
    const Facility = evt.layer.feature;

    const F_SelectedEvent = new CustomEvent('facilityselected', { detail: { Facility } });
    window.dispatchEvent(F_SelectedEvent);
}

function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.FLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
        fillColor: '#EB0000',
        fillOpacity: 0.9,
        stroke: false,
    },
    }).addTo(map);

    map.FLayer.addEventListener('click', onFClicked);

    map.positionLayer = L.geoJSON(null).addTo(map);

    return map;
}


function showFonMap(map, name)
{
    fetch('data/Mathare.geojson')
.then(response => {
    // Parse the response into a JavaScript object
    return response.json();
})
.then(geojson => {
    // Save the resulting object as a variable
    const myGeojson = geojson;

    const filteredGeojson = {
        type: 'FeatureCollection',
        features: myGeojson.features.filter(f => f.properties.FacilityTy === name),
    };

      // Add the filtered GeoJSON points to the map as markers
    L.geoJSON(filteredGeojson, {
        pointToLayer: (feature, latlng) => L.marker(latlng),
    }).addTo(map);
})}




export {
    initMap,
    showFonMap,

};
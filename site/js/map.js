
const mapboxAccount = 'mapbox';
const mapboxStyle = 'light-v10';
const mapboxToken = 'pk.eyJ1IjoiY29udHJhaWwtZW50aHVzaWFzdCIsImEiOiJjbDlsbTRteXEwMWh0M3VwZjBqc2JrbWZ4In0.MCAs44cMD-2XioBijyx_Iw';

function initializeMap () {
    //initial zoom and center
    let map = L.map('map').setView([39.95764876954889, -75.1629638671875], 12);

    //add basemap
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.dataLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
          fillColor: '#83bf15',
          fillOpacity: 0.3,
          stroke: false,
        },
      }).addTo(map);

    /*including catchments polygon and restyling
    L.geoJSON(catchments, {
        style: { fill: null, weight:0.5, color: '#000' },
    })
    .addTo(schoolsMap);*/

    return map;
}


export{
    initializeMap,
};


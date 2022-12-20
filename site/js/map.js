

let infoIcon = L.icon({
    iconUrl: './assets/blue.png',
    iconSize: [15, 15],
    className: 'fadeaway',
});

let qolIcon = L.icon({
    iconUrl: './assets/blue.png',
    iconSize: [15, 15],
    className: 'fadeaway',
});

let streetsIcon = L.icon({
    iconUrl: './assets/yellow.png',
    iconSize: [15, 15],
    className: 'fadeaway',
});

let complaintIcon = L.icon({
    iconUrl: './assets/red.png',
    iconSize: [15, 15],
    className: 'fadeaway',
});

let miscIcon = L.icon({
    iconUrl: './assets/orange.png',
    iconSize: [15, 15],
    className: 'fadeaway',
});

function initializeMap() {
    //initial zoom and center
    let map = L.map('map', { zoomControl: false }).setView([39.962443024832446, -75.16139981702757], 12);

    //add basemap
    L.tileLayer(`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=RiEiQBgvMlMLXAfQL2dASmd8CHzIHfvNFFReiWxhPPIbhFt1c8CVubEJSPhcAVyf`, {
        maxZoom: 19,
        //attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.infoLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: infoIcon }),
    }).addTo(map);

    map.qolLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: qolIcon }),
    }).addTo(map);

    map.streetsLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: streetsIcon }),
    }).addTo(map);

    map.complaintLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: complaintIcon }),
    }).addTo(map);

    map.miscLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, { icon: miscIcon }),
    }).addTo(map);

    /*including catchments polygon and restyling
    L.geoJSON(catchments, {
        style: { fill: null, weight:0.5, color: '#000' },
    })
    .addTo(schoolsMap);*/

    return map;
}


export {
    initializeMap,
};


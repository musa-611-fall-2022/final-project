function initializeMap() {
    let map = L.map('map').setView([39.95244193418098, -75.16433792450688], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoiaGVucnlmZWluc3RlaW4iLCJhIjoiY2w4dzIyYXc0MDN2dTNwcnE3ZnMzOXh5OCJ9.Xj0CS62yWWvKB-v_uYz9sQ';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    return map;
}

function createObsPointFeatures(data) {
    let obsCollection = {
        type: "FeatureCollection",
        features: [],
    };
    for (let obs of data) {
        let obsElement = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [obs.lng, obs.lat],
            },
            properties: { // more as needed
                comName: obs.comName,
                sciName: obs.sciName,
                speciesCode: obs.speciesCode,
                howMany: obs.howMany,
                obsDt: obs.obsDt,
            },
        };
        obsCollection.features.push(obsElement);
    }
    return obsCollection;
}

function onEachFeature(feature, layer) {
    // event handler for clicks on map points
    layer.on('click', () => {
        console.log(feature.properties.comName);
    });
}

function addPointsToMap(points, map) {
    if (map.obsLayer) {
        map.removeLayer(map.obsLayer);
    }
    map.obsLayer = L.geoJSON(points, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        onEachFeature: onEachFeature,
        style: {
            fillColor: "orange",
            stroke: null,
            fillOpacity: 0.9,
            radius: 7,
        },
    }).addTo(map);
}

export {
    initializeMap,
    createObsPointFeatures,
    addPointsToMap,
};
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
                coordinates: [obs.lat, obs.lng],
            },
            properties: { // more as needed
                comName: obs.conName,
                sciName: obs.sciName,
                speciesCode: obs.speciesCode,
                howMany: obs.howMany,
                obsDt: obs.obsDt,
            },
        };
        obsCollection.push(obsElement);
    }
    return obsCollection;
}

function addPointsToMap(points, map) {
    // TODO: check if layer already exists and clear it if so
    map.obsLayer = L.geoJSON(points).addTo(map);
}

export {
    initializeMap,
    createObsPointFeatures,
    addPointsToMap,
};
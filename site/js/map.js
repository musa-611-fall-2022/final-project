import { buildPopup } from './popups.js';
import { map } from './main.js';

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
                pointType: 'obs',
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

function createHotspotPointFeatures(data) {
    let hotspotCollection = {
        type: "FeatureCollection",
        features: [],
    };
    for (let hotspot of data) {
        let hotspotElement = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [hotspot.lng, hotspot.lat],
            },
            properties: { // more as needed
                pointType: 'hotspot',
                locName: hotspot.locName,
                numSpeciesAllTime: hotspot.numSpeciesAllTime,
                latestObsDt: hotspot.latestObsDt,
            },
        };
        hotspotCollection.features.push(hotspotElement);
    }
    return hotspotCollection;
}

function onEachFeature(feature, layer) {
    // event handler for clicks on map points
    layer.on('click', () => {
        if (map.highlightLayer) {
            map.removeLayer(map.highlightLayer);
        }
        map.highlightLayer = L.geoJSON(feature, {
            pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
            style: {
                fillColor: "orange",
                stroke: null,
                fillOpacity: 1,
                radius: 9,
            },
        }).addTo(map);
        buildPopup(feature);
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
            fillColor: "#8a2be2",
            stroke: null,
            fillOpacity: 0.8,
            radius: 7,
        },
    }).addTo(map);
}

function locateMe(map){
    const successCallback = (pos) => {
        if (map.positionLayer) {
            map.removeLayer(map.positionLayer);
        }
        let myLocation = {
            'type': 'Point',
            'coordinates': [pos.coords.longitude, pos.coords.latitude],
        };
        map.positionLayer = L.geoJSON(myLocation).addTo(map);
        // un-comment following line if we want the map to zoom to user location on startup:
        //map.setView([pos.coords.latitude, pos.coords.longitude], 19);
        return myLocation;
    };
    const errorCallback = (e) => console.log(e);
    const options = { enableHighAccuracy: true, timeout: 10000 };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
}

export {
    initializeMap,
    createObsPointFeatures,
    createHotspotPointFeatures,
    addPointsToMap,
    locateMe,
};
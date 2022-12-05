//import catchments from '../data/catchments.js';
import clusters from '../data/EastAsianCluster.geojson.js';
window.clusters = clusters

function initializeSchoolMap(){
    let schoolMap = L.map('school-map').setView([40.0, -75.11], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);
 //Add catchments as a geojson layer
    L.geoJSON(clusters, {
       style: { fill: null, color: 'black' },
    }).addTo(schoolMap);

    return schoolMap;
}

// Function to pull geomtery
// function pulls select features from each school
function makeSchoolFeature(school) {
    return{
        'type': 'Feature',
        'id': school["sdp_id"],
        'properties':{
            "school_name": school["name"],
            "Email": school["FACE Liason Email"],
            "Phone Number": school["FACE Liasion Phone Number"],
            "Admission type": school["Admission Type"],
            "Grades Served": school["Current Grade Span Served"],
        },
        "geometry": school["geom"],
    };
}

// Function should map all the points we just pulled
function showSchoolsOnMap(SchoolsToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }
    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": SchoolsToShow.map(makeSchoolFeature),
    };

    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
        },
    })
    .bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolMap);
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
  };


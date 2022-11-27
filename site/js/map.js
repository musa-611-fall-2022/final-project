

function initializeSchoolMap() {
    let seattleMap = L.map("seattle-map").setView([47.59754536219717, -122.32273462371629], 11);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=cb44e9fb-1d46-4808-b9e1-2f867dbe35ea', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(seattleMap);

    // ATTEMPT AT STRETCH 1 TASK
    // L.geoJSON(catchments).addTo(schoolMap)

    // L.geoJSON(philly, {
    //     style: {
    //         fill: null,
    //         color: "#023047",
    //         fillOpacity: 0.8,
    //     },
    // }).addTo(schoolMap);

    // return schoolMap;
    // }

// function makePlaceFeature(filipinotown) {
//     const placeInfo = {
//         "type":"Feature",
//         "id": schools['sdp_id'],
//         "properties": {
//             "schoolName": schools['name'],
//             "schoolType": schools['School Level'],
//             "address": schools['Street Address'],
//             "website": schools['Website'],
//             "id": schools['sdp_id'],
//         },
//     "geometry": schools['geom'],
//     };
//     return schoolInfo;
// }


// function showSchoolsOnMap(schoolsToShow, schoolMap){
//     if (schoolMap.schoolLayers !== undefined) {
//         schoolMap.removeLayer(schoolMap.schoolLayers);
//     }
// const schoolFeatureCollection = {
//     "type": "FeatureCollection",
//     "features": schoolsToShow.map(makeSchoolFeature),
// };

// schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
//     pointToLayer: (geoJsonPoint, latlng) =>  L.circleMarker(latlng),
//     style: {
//         stroke: null,
//         color: "#023047",
//         fillOpacity: 0.7, radius: 5,
//     },
// })


// .bindPopup(layer => layer.feature.properties['schoolName']).openPopup()

// // ATTEMPT AT STRETCH 1 TASK
// // .on("click", () => {
// //     schoolHighlight(schools)
// //     console.log(schools['name'])
// // })


// .addTo(schoolMap);

// }

// export {
//     initializeSchoolMap,
//     showSchoolsOnMap,
// };

// window.makeSchoolFeature=makeSchoolFeature;

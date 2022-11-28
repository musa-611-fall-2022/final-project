

function initializeSeattleMap() {
    let seattleMap = L.map("seattle-map").setView([47.59754536219717, -122.32273462371629], 11);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=cb44e9fb-1d46-4808-b9e1-2f867dbe35ea', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(seattleMap);

    return seattleMap;
}

// function makePlaceFeature(filipinotown) {
//     const placeInfo = {
//         "type":"Feature",
//         "id": filipinotown['OBJECTID'],
//         "properties": {
//             "name": filipinotown['Name'],
//             "type": filipinotown['Type'],
//             "address": filipinotown['Location'],
//             "firstDate": filipinotown['First Date'],
//             "lastDate": filipinotown['Last Date'],
//             "years": filipinotown['Years'],
//             "owner": filipinotown['Owner'],
//             "id": filipinotown['OBJECTID'],
//         },
//         "geometry": {
//             "lat": filipinotown['Lat'],
//             "long": filipinotown['Long'],
//         },
//     };
//     return placeInfo;
// }

// function showPlacesOnMap(placesToShow, seattleMap){
//     if (seattleMap.placesLayers !== undefined) {
//         seattleMap.removeLayer(seattleMap.placesLayers);
//     }
// const placeFeatureCollection = {
//     "type": "FeatureCollection",
//     "features": placesToShow.map(makePlaceFeature),
// };

// }


export {
    initializeSeattleMap,
    // showPlacesOnMap,
};

// window.makePlaceFeature=makePlaceFeature;

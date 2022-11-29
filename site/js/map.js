function initializeSeattleMap() {
    let seattleMap = L.map("seattle-map").setView([47.59754536219717, -122.32273462371629], 15);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=cb44e9fb-1d46-4808-b9e1-2f867dbe35ea', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(seattleMap);

    return seattleMap;
}

function makeFtFeature(filipinotown) {
    const ftInfo = {
        "type":"Feature",
        "id": filipinotown['OBJECTID'],
        "properties": {
            "name": filipinotown['Name'],
            "type": filipinotown['Type'],
            "owner": filipinotown['Owner'],
            "startYear": filipinotown['First_Date'],
            "endYear": filipinotown['Last_Date'],
            "totalYears": filipinotown['Years'],
            "address": filipinotown['Location'],
            "id": filipinotown['OBJECTID'],
        },
    "geometry": filipinotown['geometry'],
    };
    console.log(ftInfo)
    return ftInfo;
}


function showFtOnMap(ftToShow, seattleMap){
    if (seattleMap.seattleLayers !== undefined) {
        seattleMap.removeLayer(seattleMap.seattleLayers);
    }
const ftFeatureCollection = {
    "type": "FeatureCollection",
    "features": ftToShow.map(makeFtFeature),
};

seattleMap.seattleLayers = L.geoJSON(ftFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) =>  L.circleMarker(latlng),
    style: {
        stroke: null,
        color: "#023047",
        fillOpacity: 0.7, radius: 5,
    },
})}

export {
    initializeSeattleMap,
    showFtOnMap
};

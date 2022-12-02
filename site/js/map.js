function initializeSeattleMap() {
    let seattleMap = L.map("seattle-map").setView([47.59754536219717, -122.32273462371629], 15);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=cb44e9fb-1d46-4808-b9e1-2f867dbe35ea', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(seattleMap);

    
    function onMapClick(seattle) {
        let popup = L.popup();
        popup
        .setLatLng(seattle.latlng)
        .setContent(`
        <style>
        .new-biz-container {
            width: 115%;
            height: 80%;
            overflow-y: scroll;
            max-height: 25vh;
            overflow: auto;
            transition: max-height 0.75s;
          } 
        </style>

        <div class="new-biz-container">
            <h2 class = 'newbiz'> Add Business </h2>
            <h3>Business Name:</h3>
            <input type="text" id="new-entry" placeholder="Enter business name">
            <h3>Business Type:</h3>
                <select id="cars" name="cars">
                    <option value="Beauty">Beauty</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Food">Food</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Hotel">Hotel</option>
                    <option value="News">News</option>
                    <option value="Recreation">Recreation</option>
                    <option value="Service">Service</option>
                    <option value="Social">Social</option>
                </select>
            <h3>Owner:</h3>
            <input type="text" id="new-entry" placeholder="Enter business name">
            <h3>Opening Year:</h3>
            <input type="text" id="new-entry" placeholder="Enter business name">
            <h3>End Year:</h3>
            <input type="text" id="new-entry" placeholder="Enter business name">
            <h3>Address:</h3>
            <input type="text" id="new-entry" placeholder="Enter business name">
            <h3>Preserve history:</h3>
            <input type="text" placeholder="Please share any memories you have with this space" height=10>
            <br></br>
            <button type="submit" value="Submit">Submit</button>
        </div>
        `) 
        // this is just html ^
        .openOn(seattleMap);
    }
    seattleMap.on('click', onMapClick);

    function onPopupOpen() {
        document.querySelector('.newbiz').addEventListener('click', () => { alert('I clicked here.') });
    }
    seattleMap.on('popupopen', onPopupOpen);

    return seattleMap;
}

function makeFtFeature(filipinotown) {
    const ftInfo = {
        "type":"Feature",
        "id": filipinotown.properties['OBJECTID'],
        "properties": {
            "name": filipinotown.properties['Name'],
            "bizType": filipinotown.properties['Type'],
            "owner": filipinotown.properties['Owner'],
            "startYear": filipinotown.properties['First_Date'],
            "endYear": filipinotown.properties['Last_Date'],
            "totalYears": filipinotown.properties['Years'],
            "address": filipinotown.properties['Location'],
            "id": filipinotown.properties['OBJECTID'],
        },
    "geometry": filipinotown['geometry'],
    };
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
        color: "#7ca982",
        fillOpacity: 0.7, radius: 5,
    },
})
.bindPopup(layer => `
    <h2>${layer.feature.properties['name']}</h2>
    <h3>Business Type: ${layer.feature.properties['bizType']}</h3>
    <h3>Address: ${layer.feature.properties['address']}</h3>
    <h3>Opening Year: ${layer.feature.properties['startYear']}</h3>
`).openPopup()

.addTo(seattleMap);
}

export {
    initializeSeattleMap,
    showFtOnMap
};

window.makeFtFeature = makeFtFeature;

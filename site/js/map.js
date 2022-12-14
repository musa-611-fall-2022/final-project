import { loadNotes, saveNote } from './storage.js';
import { initToast, showToast } from './toast.js';


let newBusinesses = {
    type: 'FeatureCollection',
    features: [],
};

function initializeSeattleMap() {
    let seattleMap = L.map("seattle-map").setView([47.59754536219717, -122.32273462371629], 15);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=cb44e9fb-1d46-4808-b9e1-2f867dbe35ea', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(seattleMap);

    let mapClickPoint = null;

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
            max-height: 40vh;
            overflow: auto;
            transition: max-height 0.75s;
          } 
        </style>

        <div class="new-biz-container">
            <h2 class = 'newbiz'> Add Business </h2>
            <h3>Your Name:</h3>
            <input type="text" id="user-name" placeholder="Enter your name">
            <h3>Your Phone Number:</h3>
            <input type="text" id="user-phone" placeholder="Enter your phone number">
            <h3>Business Name:</h3>
            <input type="text" id="business-name" placeholder="Enter business name">
            <h3>Business Type:</h3>
                <select id="business-type" name="business-type">
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
            <input type="text" id="owner" placeholder="Enter owner name">
            <h3>Opening Year:</h3>
            <input type="text" id="start" placeholder="Enter opening year">
            <h3>End Year:</h3>
            <input type="text" id="end" placeholder="Enter ending year">
            <h3>Address:</h3>
            <input type="text" id="address" placeholder="Enter address">
            <h3>Preserve history:</h3>
            <input type="text" id="history" placeholder="Your favorite memories" height=10>
            <br></br>
            <button id = 'add-point' class = 'add-point' type="submit" value="Add">Add</button>
            <button id = 'submit' class = 'submit' type="submit" value="Submit">Submit</button>
        </div>
        `)
        .openOn(seattleMap);
        mapClickPoint = seattle.latlng;
    }
    seattleMap.on('click', onMapClick);

    function newBusiness() {
        document.querySelector('.add-point').addEventListener('click', () => {
            let businessName = document.getElementById('business-name').value;
            let businessType = document.getElementById('business-type').value;
            let businessOwner = document.getElementById('owner').value;
            let businessStart = document.getElementById('start').value;
            let businessEnd = document.getElementById('end').value;
            let businessAddress = document.getElementById('address').value;
            let businessHistory = document.getElementById('history').value;
            let businessGeometry = mapClickPoint;
            const newFeature = {
                "type":"Feature",
                "properties": {
                    "name": businessName,
                    "bizType": businessType,
                    "owner": businessOwner,
                    "startYear": businessStart,
                    "endYear": businessEnd,
                    "address": businessAddress,
                    "history": businessHistory,
                    },
                "geometry": businessGeometry,
            };
            console.log(newFeature);
            // seattleMap.newBusinessLayer.addData(newFeature);
            newBusinesses.features.push(newFeature);
            console.log(newBusinesses);

            let app = {
                newBusinesses,
                notes: null,
            };

            const saveBizEl = document.getElementById('submit');

            const userNameEl = document.getElementById('user-name');
            const userPhoneEl = document.getElementById('user-phone');
            const bizNameEl = document.getElementById('business-name');
            const bizTypeEl = document.getElementById('business-type');
            const bizOwnerEl = document.getElementById('owner');
            const bizStartEl = document.getElementById('start');
            const bizEndEl = document.getElementById('end');
            const bizAddressEl = document.getElementById('address');
            const bizHistoryEl = document.getElementById('history');

            function showBizDataInForm(biz) {
                const userName = biz.properties['user-name'];
                const userPhone = biz.properties['user-phone'];
                const bizName = biz.properties['business-name'];
                const bizType = biz.properties['business-type'];
                const bizOwner = biz.properties['owner'];
                const bizStart = biz.properties['start'];
                const bizEnd = biz.properties['end'];
                const bizAddress = biz.properties['address'];
                const bizHistory = biz.properties['history'];
                userNameEl.innerHTML = userName;
                userPhoneEl.innerHTML = userPhone;
                bizTypeEl.innerHTML = bizType;
                bizNameEl.innerHTML = bizName;
                bizTypeEl.innerHTML = bizType;
                bizOwnerEl.innerHTML = bizOwner;
                bizStartEl.innerHTML = bizStart;
                bizEndEl.innerHTML = bizEnd;
                bizAddressEl.innerHTML = bizAddress;
                bizHistoryEl.innerHTML = bizHistory;
            }

            function getFormContent() {
                const userNameNote = userNameEl.value;
                const userPhoneNote = userPhoneEl.value;
                const nameNote = bizNameEl.value;
                const typeNote = bizTypeEl.value;
                const ownerNote = bizOwnerEl.value;
                const startNote = bizStartEl.value;
                const endNote = bizEndEl.value;
                const addressNote = bizAddressEl.value;
                const historyNote = bizHistoryEl.value;
                const colon = ": ";
                const comma = ", ";
                const note = userNameNote + comma + userPhoneNote + colon + nameNote + comma + typeNote + comma + ownerNote + comma + startNote + comma + endNote + comma + addressNote + comma + historyNote;
                console.log(note);
                return note;
              }

            function onNotesSaveSuccess() {
                showToast('Saved!', 'toast-success');
            }

            function onSaveClicked() {
                const content = getFormContent();
                const bizId = app.newBusinesses.features['name'];
                saveNote(bizId, content, app, onNotesSaveSuccess);
            }

            function onBizSelected(evt) {
                const biz = evt.layer.feature;
                app.currentBiz = biz;
                showBizDataInForm(biz, app);
            }

            function setupInteractionEvents() {
             seattleMap.seattleLayers.addEventListener('click', onBizSelected);
             saveBizEl.addEventListener('click', onSaveClicked);
            }

            setupInteractionEvents();

            loadNotes(notes => {
                app.notes = notes;
              });
              initToast();

            window.app = app;

            let newPoint = L.circleMarker(mapClickPoint, {
                stroke: null,
                color: "#164161",
                fillOpacity: 0.7,
                radius: 5,
            })
            .bindPopup(() => `
            <h2>${newFeature.properties['name']}</h2>
            <h3>Business Type: ${newFeature.properties['bizType']}</h3>
            <h3>Owner: ${newFeature.properties['owner']}</h3>
            <h3>Opening Year: ${newFeature.properties['startYear']}</h3>
            <h3>Ending Year: ${newFeature.properties['endYear']}</h3>
            <h3>Address: ${newFeature.properties['address']}</h3>
            <h3>History: ${newFeature.properties['history']}</h3>
            `).openPopup()
            .addTo(seattleMap);
            console.log(newPoint);
        });
        }
    seattleMap.on('click', newBusiness);

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
        color: "#84a98c",
        fillOpacity: 0.7, radius: 5,
    },
})
.bindPopup(layer => `
    <h2>${layer.feature.properties['name']}</h2>
    <h3>Business Type: ${layer.feature.properties['bizType']}</h3>
    <h3>Opening Year: ${layer.feature.properties['startYear']}</h3>
    <h3>Ending Year: ${layer.feature.properties['endYear']}</h3>
    <h3>Address: ${layer.feature.properties['address']}</h3>

`).openPopup()

.addTo(seattleMap);
}

export {
    initializeSeattleMap,
    showFtOnMap,
};

window.makeFtFeature = makeFtFeature;
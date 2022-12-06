import { initializeMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL } from "./dataPull.js";

// setup

// initialize map
let map = initializeMap();

// on startup, always load current recent observation data
let url = buildURL('recentObs');
getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');

function onNotableObsClick() {
    if (notableObsButton.checked === true) {
        if (hotspotButton.checked === true) { 
            hotspotButton.click();
        }
        url = buildURL('notableObs');
        getData(url, dataPullSuccess, dataPullFailure, map, 'notableObs');
    } else {
        url = buildURL('recentObs');
        getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');
    }
}

function onHotspotClick() {
    if (hotspotButton.checked === true) {
        if (notableObsButton.checked === true) { 
            notableObsButton.click(); 
        }
        url = buildURL('hotspot');
        getData(url, dataPullSuccess, dataPullFailure, map, 'hotspot');
    } else {
        url = buildURL('recentObs');
        getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');
    }
}

// event listener for notable observations
let notableObsButton = document.querySelector("#notable-obs");
notableObsButton.addEventListener('click', onNotableObsClick);
// event listener for hotspots
let hotspotButton = document.querySelector("#hotspots");
hotspotButton.addEventListener('click', onHotspotClick);


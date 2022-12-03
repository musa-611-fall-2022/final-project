import { initializeMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL } from "./dataPull.js";

// setup

// initialize map
let map = initializeMap();

// on startup, always load current recent observation data
let url = buildURL('recentObs');
getData(url, dataPullSuccess, dataPullFailure, map);

function onNotableObsClick() {
    if (notableObsButton.checked === true) {
        url = buildURL('notableObs');
        getData(url, dataPullSuccess, dataPullFailure, map);
    } else {
        url = buildURL('recentObs');
        getData(url, dataPullSuccess, dataPullFailure, map);
    }
}

// event listener for notable observations
let notableObsButton = document.querySelector("#notable-obs");
notableObsButton.addEventListener('click', onNotableObsClick);


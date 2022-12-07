import { initializeMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL, getSpeciesList } from "./dataPull.js";

// setup

// initialize map
let map = initializeMap();

// initialize species list
let speciesList = await getSpeciesList();

// on startup, always load current recent observation data
let url = buildURL('recentObs');
let currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');

async function onRecentObsClick() {
    if (recentObsButton.classList.contains("unpressed")) {
        recentObsButton.classList.remove("unpressed");
        recentObsButton.classList.add("pressed");
        notableObsButton.classList.remove("pressed");
        notableObsButton.classList.add("unpressed");
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
        url = buildURL('recentObs');
        currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');
    } else {
        map.removeLayer(map.obsLayer);
        recentObsButton.classList.remove("pressed");
        recentObsButton.classList.add("unpressed");
    }
}

async function onNotableObsClick() {
    if (notableObsButton.classList.contains("unpressed")) {
        notableObsButton.classList.remove("unpressed");
        notableObsButton.classList.add("pressed");
        recentObsButton.classList.remove("pressed");
        recentObsButton.classList.add("unpressed");
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
        url = buildURL('notableObs');
        currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'notableObs');
    } else {
        map.removeLayer(map.obsLayer);
        notableObsButton.classList.remove("pressed");
        notableObsButton.classList.add("unpressed");
    }
}

async function onHotspotClick() {
    if (hotspotButton.classList.contains("unpressed")) {
        hotspotButton.classList.remove("unpressed");
        hotspotButton.classList.add("pressed");
        recentObsButton.classList.remove("pressed");
        recentObsButton.classList.add("unpressed");
        notableObsButton.classList.remove("pressed");
        notableObsButton.classList.add("unpressed");
        url = buildURL('hotspot');
        currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'hotspot');
    } else {
        map.removeLayer(map.obsLayer);
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
    }
}

async function onSearchClick() {
    let filteredData = speciesList.filter(function(data) {
        return data.comName.toLowerCase() === searchBar.value.toLowerCase();
    })[0];
    console.log(filteredData);
    let url = `https://api.ebird.org/v2/data/obs/geo/recent/${filteredData.speciesCode}?lat=39.952&lng=-75.164&back=30&dist=50`
    currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'birdObs');
}

function onPopupCloseClick(popupContainer) {
    popupContainer.classList.remove("popup-container-up");
    popupContainer.classList.add("popup-container");
    map.removeLayer(map.highlightLayer);
}

// event listener for recent observations
let recentObsButton = document.querySelector("#recent-obs");
recentObsButton.addEventListener('click', onRecentObsClick)
// event listener for notable observations
let notableObsButton = document.querySelector("#notable-obs");
notableObsButton.addEventListener('click', onNotableObsClick);
// event listener for hotspots
let hotspotButton = document.querySelector("#hotspots");
hotspotButton.addEventListener('click', onHotspotClick);
// event listener for search button
let searchButton = document.querySelector("#bird-search-button");
let searchBar = document.querySelector("#bird-search");
searchButton.addEventListener('click', onSearchClick);


// event listener for popup close button
// QUESTION: HOW TO ADD EVENT LISTENER FOR BUTTON THAT DOESN'T EXIST ON BOOT 
let popupContainer = document.getElementById("popup-container");
let popupCloseButton = document.querySelector(".popup-button");
popupCloseButton.addEventListener('click', onPopupCloseClick(popupContainer));

export {
    map,
};



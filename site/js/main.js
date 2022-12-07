import { initializeMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL, getSpeciesList } from "./dataPull.js";

// setup

// initialize map
let map = initializeMap();

// initialize species list
let speciesList = await getSpeciesList();

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

function onSearchClick() {
    let filteredData = speciesList.filter(function(data) {
        return data.comName.toLowerCase() === searchBar.value.toLowerCase();
    });
    // TODO: display locations of any matches, along with bird information
}

function onPopupCloseClick(popupContainer) {
    popupContainer.classList.remove("popup-container-up");
    popupContainer.classList.add("popup-container");
    map.removeLayer(map.highlightLayer);
}

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



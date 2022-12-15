import { initializeMap, locateMe, addPointsToMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL, getSpeciesList } from "./dataPull.js";
import { buildRecentObsList, buildSavedHotspotList } from "./popups.js";

// setup

// initialize map
let map = initializeMap();
locateMe(map);

// initialize species list
let speciesList = await getSpeciesList();

// initialize hotspot target list
let hotspotList = JSON.parse(localStorage.getItem('hotspotList') || '{"type": "FeatureCollection", "features": []}');
if (hotspotList.features.length > 0) {
    buildSavedHotspotList(hotspotList, true);
} else {
    buildSavedHotspotList(hotspotList, false);
}

// on startup, always load current recent observation data
let url = buildURL('recentObs');
let currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'recentObs');
buildRecentObsList(currentPoints);

// get DOMs
let recentObsButton = document.querySelector("#recent-obs");
let notableObsButton = document.querySelector("#notable-obs");
let hotspotButton = document.querySelector("#hotspots");
let searchButton = document.querySelector("#bird-search-button");
let searchBar = document.querySelector("#bird-search");
let savedHotspotButton = document.querySelector("#show-hotspot-list");
let clearHotspotButton = document.querySelector("#clear-hotspot-list");

async function onRecentObsClick() {
    if (recentObsButton.classList.contains("unpressed")) {
        recentObsButton.classList.remove("unpressed");
        recentObsButton.classList.add("pressed");
        notableObsButton.classList.remove("pressed");
        notableObsButton.classList.add("unpressed");
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
        savedHotspotButton.classList.remove("pressed");
        savedHotspotButton.classList.add("unpressed");
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
        savedHotspotButton.classList.remove("pressed");
        savedHotspotButton.classList.add("unpressed");
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
        savedHotspotButton.classList.remove("pressed");
        savedHotspotButton.classList.add("unpressed");
        url = buildURL('hotspot');
        currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'hotspot');
    } else {
        map.removeLayer(map.obsLayer);
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
    }
}

function onSavedHotspotButtonClick() {
    if (savedHotspotButton.classList.contains("unpressed")) {
        savedHotspotButton.classList.remove("unpressed");
        savedHotspotButton.classList.add("pressed");
        recentObsButton.classList.remove("pressed");
        recentObsButton.classList.add("unpressed");
        notableObsButton.classList.remove("pressed");
        notableObsButton.classList.add("unpressed");
        hotspotButton.classList.remove("pressed");
        hotspotButton.classList.add("unpressed");
        addPointsToMap(hotspotList, map);
        currentPoints = hotspotList;
    } else {
        map.removeLayer(map.obsLayer);
        savedHotspotButton.classList.remove("pressed");
        savedHotspotButton.classList.add("unpressed");
    }
}

function onClearHotspotButtonClick() {
    hotspotList.features = [];
    localStorage.setItem('hotspotList', JSON.stringify(hotspotList));
    buildSavedHotspotList(hotspotList, false);
}

async function onSearchClick() {
    let filteredData = speciesList.filter(function(data) {
        return data.comName.toLowerCase() === searchBar.value.toLowerCase();
    })[0];
    console.log(filteredData);
    let url = `https://api.ebird.org/v2/data/obs/geo/recent/${filteredData.speciesCode}?lat=39.952&lng=-75.164&back=30&dist=50`;
    currentPoints = await getData(url, dataPullSuccess, dataPullFailure, map, 'birdObs');
    searchBar.value = "";
}

// event listener for recent observations
recentObsButton.addEventListener('click', onRecentObsClick);
// event listener for notable observations
notableObsButton.addEventListener('click', onNotableObsClick);
// event listener for hotspots
hotspotButton.addEventListener('click', onHotspotClick);
// event listener for search button
searchButton.addEventListener('click', onSearchClick);
// event listener for search bar enter key
searchBar.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        searchButton.click();
    }
});
// event listener for show saved hotspots button
savedHotspotButton.addEventListener('click', onSavedHotspotButtonClick);
// event listener for clear saved hotspots button
clearHotspotButton.addEventListener('click', onClearHotspotButtonClick);

export {
    map,
    hotspotList,
};

window.currentPoints = currentPoints;



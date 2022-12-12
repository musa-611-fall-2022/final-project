import { map, hotspotList } from './main.js';

function onPopupCloseClick(popupContainer) {
    popupContainer.innerHTML = '';
    popupContainer.classList.remove("popup-container-up");
    popupContainer.classList.add("popup-container");
    map.removeLayer(map.highlightLayer);
}

function buildRecentObsList(currentPoints) {
    let birdListContainer = document.getElementById("bird-list-container");
    birdListContainer.innerHTML = "";
    for (let obs of currentPoints.features) {
        let html = `
            <div class="listed-obs">
                <span class="list-com-name">${obs.properties.comName}</span>
                <span class="list-date">Date & Time Seen: ${obs.properties.obsDt}</span>
                <span class="list-how-many">Number Seen: ${obs.properties.howMany}</span>
            </div>
        `;
        birdListContainer.innerHTML += html;
    }
}

function buildSavedHotspotList(hotspotList, anySaved) {
    let hotspotListContainer = document.getElementById("hotspot-list-container");
    hotspotListContainer.innerHTML = "";
    if (anySaved === true) {
        for (let hotspot of hotspotList.features) {
            let html = `
                <div class="listed-obs">
                    <span class="list-com-name">${hotspot.properties.locName}</span>
                    <span class="list-date">Latest Observation Date & Time: ${hotspot.properties.latestObsDt}</span>
                    <span class="list-how-many">Number of Species Observed All-Time: ${hotspot.properties.numSpeciesAllTime}</span>
                </div>
            `;
            hotspotListContainer.innerHTML += html;
        }
    } else {
        hotspotListContainer.innerHTML = "No hotspots saved yet! ";
    }
}

function onHotspotSaveClick(feature) {
    console.log(feature);
    hotspotList.features.unshift(feature);
    localStorage.setItem('hotspotList', JSON.stringify(hotspotList));
    buildSavedHotspotList(hotspotList, true);
}

function buildPopup(feature) {
    console.log(feature);
    let popupContainer = document.getElementById("popup-container");
    let html;
    if (feature.properties.pointType === 'obs') {
        html = `
            <div class="popup">
                <div class="popup-info">
                    <span class="common-name">${feature.properties.comName}</span>
                    <span class="scientific-name">${feature.properties.sciName}</span>
                    <div class="popup-info-box">
                        <span class="num-observed">Number Observed: ${feature.properties.howMany}</span>
                        <span class="obs-date">Observation Date & Time: ${feature.properties.obsDt}</span>
                        <a href="https://ebird.org/species/${feature.properties.speciesCode}" target="_blank" class="ebird-link">Explore This Bird's eBird Profile</a>
                    </div>
                </div>
                <button type="button" class="popup-button filter-button" id="close-button">Close</button>
            </div>
        `;
    } else {
        html = `
            <div class="popup">
                <div class="popup-info">
                    <span class="common-name">${feature.properties.locName}</span>
                    <span class="scientific-name"></span>
                    <div class="popup-info-box">
                        <span class="num-observed">Number of Species Observed All-Time: ${feature.properties.numSpeciesAllTime}</span>
                        <span class="obs-date">Latest Observation Date & Time: ${feature.properties.latestObsDt}</span>
                        <button type="button" class="popup-button filter-button bird-search-button" id="hotspot-save-button">Save This Hotspot</button>
                    </div>
                </div>
                <button type="button" class="popup-button filter-button" id="close-button">Close</button>
            </div>
        `;
    }
    if (popupContainer.classList.contains("popup-container")) {
        popupContainer.classList.remove("popup-container");
        popupContainer.classList.add("popup-container-up");
    }
    popupContainer.innerHTML = '';
    popupContainer.innerHTML += html;

    // event listener for hotspot save button
    if (feature.properties.pointType !== 'obs' ) {
        let hotspotSaveButton = document.getElementById("hotspot-save-button");
        hotspotSaveButton.addEventListener('click', () => onHotspotSaveClick(feature));
    }

    // event listener for popup close button
    let popupCloseButton = document.getElementById("close-button");
    popupCloseButton.addEventListener('click', () => onPopupCloseClick(popupContainer));
}

export {
    buildPopup,
    buildRecentObsList,
    buildSavedHotspotList,
};
import { map } from './main.js';

function onPopupCloseClick(popupContainer) {
    popupContainer.innerHTML = '';
    popupContainer.classList.remove("popup-container-up");
    popupContainer.classList.add("popup-container");
    map.removeLayer(map.highlightLayer);
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
                    <span class="num-observed">Number Observed: ${feature.properties.howMany}</span>
                    <span class="obs-date">Observation Date & Time: ${feature.properties.obsDt}</span>
                    <a href="https://ebird.org/species/${feature.properties.speciesCode}" target="_blank" class="ebird-link">Learn More at eBird</a>
                </div>
                <button type="button" class="popup-button">Close</button>
            </div>
        `;
    } else {
        html = `
            <div class="popup">
                <span class="hotspot-name">${feature.properties.locName}</span>
                <span class="all-time-obs">Number of Observations All-Time: ${feature.properties.numSpeciesAllTime}</span>
                <span class="latest-obs">Latest Observation Date & Time: ${feature.properties.latestObsDt}</span>
                <button type="button" class="popup-button">Close</button>
            </div>
        `;
    }
    if (popupContainer.classList.contains("popup-container")) {
        popupContainer.classList.remove("popup-container");
        popupContainer.classList.add("popup-container-up");
    }
    popupContainer.innerHTML = '';
    popupContainer.innerHTML += html;

    // event listener for popup close button
    let popupCloseButton = document.querySelector(".popup-button");
    popupCloseButton.addEventListener('click', () => onPopupCloseClick(popupContainer));
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

export {
    buildPopup,
    buildRecentObsList,
};
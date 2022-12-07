function buildPopup(feature) {
    console.log(feature);
    let popupContainer = document.getElementById("popup-container");
    let html;
    if (feature.properties.pointType === 'obs') {
        html = `
            <div class="popup">
                <span class="common-name">${feature.properties.comName}</span>
                <span class="scientific-name">${feature.properties.sciName}</span>
                <span class="num-observed">Number Observed: ${feature.properties.howMany}</span>
                <span class="obs-date">Observation Date & Time: ${feature.properties.obsDt}</span>
                <a href="https://ebird.org/species/${feature.properties.speciesCode}" class="ebird-link">Learn More at eBird</a>
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
}

export {
    buildPopup,
};
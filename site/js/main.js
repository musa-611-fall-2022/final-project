import { initializeMap, parcelLayerFun } from "./map.js";
import { setLegend } from "./legend.js";
import { changeFilter } from "./infobar.js";

let Map = initializeMap();
parcelLayerFun(Map);

function downloadInv() {
    fetch('data/parcels.geojson')
    .then(resp => resp.json())
    .then(data => {
        Map.parcelLayer.addData(data);
    });
}

downloadInv();

let parcelList = document.querySelector('#parcel-list');
let overlayDropdown = document.querySelector('#overlay');

overlayDropdown.addEventListener('click', () => {
        let value = event.target.value;
        setLegend(value);
        changeFilter(value);
});

window.overlayDropdown = overlayDropdown;
window.Map = Map;
window.parcelList = parcelList;

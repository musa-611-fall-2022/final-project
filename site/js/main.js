import { initializeMap } from "./map.js";

let Map = initializeMap();
window.Map = Map;

function downloadInv() {
    fetch('data/parcels.geojson')
    .then(resp => resp.json())
    .then(data => {
        Map.parcelLayer.addData(data);
    });
}

downloadInv();


let parcelFilter = document.querySelectorAll('.layer-checkbox');


for (const cb of parcelFilter) {
    cb.addEventListener('change', () => {
      console.log(cb.value);
      console.log(Map.parcelLayer.document);
})};
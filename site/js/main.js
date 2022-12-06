import { initializeMap, parcelLayerFun } from "./map.js";

let Map = initializeMap();
window.Map = Map;
parcelLayerFun(Map);

function downloadInv() {
    fetch('data/parcels.geojson')
    .then(resp => resp.json())
    .then(data => {
        Map.parcelLayer.addData(data);
    });
}

downloadInv();


let parcelFilter = document.querySelectorAll('.layer-checkbox');

function onButtonClick(cb) {
    console.log(cb);
    Map.parcelLayer.eachLayer(layer => {
        layer.setStyle({ color: 'red' });
  });
}

for (const cb of parcelFilter) {
    cb.addEventListener('change', () => {
      onButtonClick(cb.value);
    });
}



function polystyle(feature) {
    return {
        fillColor: parcelColors(feature.properties.OWNER_CATE),
        weight: 2,
        opacity: 1,
        color: 'NA',  //Outline color
        fillOpacity: 0.7,
    };
}

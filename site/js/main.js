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

/// Zoning coloring stuffs

//https://www.phila.gov/media/20220909084529/ZONING-QUICK-GUIDE_PCPC_9_9_22.pdf
function zoningColors(p) {
    if(p === "CA-2" ) return "tan";
    if(p === "CMX-1" ) return "tan";
    if(p === "CMX-2" ) return "tan";
    if(p === "CMX-2.5" ) return "tan";
    if(p === "CMX-3" ) return "tan";
    if(p === "I-2" ) return "tan";
    if(p === "ICMX" ) return "tan";
    if(p === "IRMX" ) return "tan";
    if(p === "RM-1" ) return "tan";
    if(p === "RM-4" ) return "tan";
    if(p === "RSA-5" ) return "tan";
    if(p === "SP-ENT") return "tan";
    if(p === "SP-PO-A") return "tan";
    return "grey";
}


function zoningstyle(feature) {
    return {
        fillColor: zoningColors(feature.properties.LONG_CODE),
        weight: 2,
        opacity: 1,
        color: 'NA',  //Outline color
        fillOpacity: 1,
    };
}


let overlayDropdown = document.querySelector('#overlay');
overlayDropdown.addEventListener('change', () => {
    Map.parcelLayer.eachLayer(layer => {
        layer.setStyle(zoningstyle(layer));
    });
    });
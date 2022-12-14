import { initializeMap, parcelLayerFun, parcelColors } from "./map.js";

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
        console.log(layer.properties.LONG_CODE);
        layer.setStyle({ color: 'red' });
  });
}

for (const cb of parcelFilter) {
    cb.addEventListener('change', () => {
      onButtonClick(cb.value);
    });
}

let parcelList = document.querySelector('#parcel-list');

/// Zoning coloring stuffs

//https://www.phila.gov/media/20220909084529/ZONING-QUICK-GUIDE_PCPC_9_9_22.pdf
function zoningColors(p) {
    if(p === "CA-2" ) return "#f7a1a4";
    if(p === "CMX-1" ) return "#f16767";
    if(p === "CMX-2" ) return "#f16767";
    if(p === "CMX-2.5" ) return "#f16767";
    if(p === "CMX-3" ) return "#ed2124";
    if(p === "I-2" ) return "#894b9e";
    if(p === "ICMX" ) return "#dcbddc";
    if(p === "IRMX" ) return "#dcbddc";
    if(p === "RM-1" ) return "#fcb951";
    if(p === "RM-4" ) return "#fcb951";
    if(p === "RSA-5" ) return "#f8ee68";
    if(p === "SP-ENT") return "#815824";
    if(p === "SP-PO-A") return "#008e46";
    return "grey";
}

function heightColors(p) {
    return "#008e46";
}


function basestyle(feature) {
    return {
        fillColor: parcelColors(feature.bcType),
        weight: 2,
        opacity: 1,
        color: 'NA',  //Outline color
        fillOpacity: 1,
    };
}


function zoningstyle(feature) {
    return {
        fillColor: zoningColors(feature.zoningCode),
        weight: 2,
        opacity: 1,
        color: 'NA',  //Outline color
        fillOpacity: 1,
    };
}

function bldheightstyle(feature) {
    return {
        fillColor: heightColors(feature.height),
        weight: 2,
        opacity: 1,
        color: 'purple',  //Outline color
        fillOpacity: 1,
    };
}



let overlayDropdown = document.querySelector('#overlay');

overlayDropdown.addEventListener('click', () => {
        let value = event.target.value;
        if(value === 'off' ) {
            Map.parcelLayer.eachLayer(layer => { layer.setStyle(basestyle(layer)) });
        }
        if(value === 'Zoning' ) {
            Map.parcelLayer.eachLayer(layer => { layer.setStyle(zoningstyle(layer)) });
        }
        if(value === 'Height' ) {
            Map.parcelLayer.eachLayer(layer => { layer.setStyle(bldheightstyle(layer)) });
        }
    });



    window.parcelList = parcelList;
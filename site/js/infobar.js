import { htmlToElement } from './template-tools.js';
import { setLegend } from './legend.js';
import { parcelColors } from './map.js';
export { highlightFeature, changeFilter };


function showParcelDeets(parcel) {
    parcelList.innerHTML = '';
    const html = `
    <div> Address: ${parcel.addy} <br>
    Owner: ${parcel.owner}  <br>
    Land Use: ${parcel.bcType} <br>
    Zoning: ${parcel.zoningCode} <br>
    Height: ${parcel.height}  </div>


    `;
    const li = htmlToElement(html);
    parcelList.append(li);
}






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
    if(p < 21 ) return "#ffffff";
    if(p > 100 ) return "#000066";
    if(p > 50 ) return "#3366ff";
    if(p > 40 ) return "#6699ff";
    if(p > 30 ) return "#99ccff";
    if(p >= 21 ) return "#ccccff";
    return "grey";
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
        color: 'NA',  //Outline color
        fillOpacity: 1,
    };
}



function commerceColors(p) {
    if(p === "bar") return 'brown';
    if(p === "pub") return 'brown';
    if(p === "marketplace") return 'green';
    if(p === "place_of_worship") return 'gold';
    if(p === "cafe") return 'yellow';
    if(p === "school") return 'purple';
    if(p === "music_venue") return 'darkred';
    if(p === "theater") return 'darkred';
    if(p === "post_office") return 'lightblue';
    if(p === "restaurant") return 'tan';
    if(p === "SHOP") return 'green';

    return "grey";
}


function commercestyle(feature) {
    return {
        fillColor: commerceColors(feature.commerce),
        weight: 2,
        opacity: 1,
        color: 'NA',  //Outline color
        fillOpacity: 1,
    };
}


function changeFilter(value) {
    setLegend(value);
    if(value === 'off' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(basestyle(layer)) });
    }
    if(value === 'Zoning' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(zoningstyle(layer)) });
    }
    if(value === 'Height' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(bldheightstyle(layer)) });
    }
    if(value === 'Commerce' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(commercestyle(layer)) });
    }
}


function highlightFeature(e) {
    if(overlayDropdown.value === 'off' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(basestyle(layer)) });
    }
    if(overlayDropdown.value === 'Zoning' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(zoningstyle(layer)) });
    }
    if(overlayDropdown.value === 'Height' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(bldheightstyle(layer)) });
    }
    if(overlayDropdown.value === 'Commerce' ) {
        Map.parcelLayer.eachLayer(layer => { layer.setStyle(commercestyle(layer)) });
    }
    e.target.setStyle({ weight: 5, color: "yellow" });
    showParcelDeets(e.target);
}



import { highlightFeature } from "./infobar.js";

function initializeMap () {
    const southWest = L.latLng(39.960774719794294, -75.14086971621691),
    northEast = L.latLng(39.9825160929394, -75.11223550383296),
    bounds = L.latLngBounds(southWest, northEast);

    let Map = L.map('fish-map', { maxBounds: bounds, maxZoom: 25, minZoom: 14.4 }).setView([39.9731, -75.1274], 14.4);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoiY2h1ZW1idWNrZXQiLCJhIjoiY2xwc3BvOXI0MDVlbzJpb2Q5YjI3NDQ3bCJ9.srRNLD08Xf4r274DtnmdCg';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(Map);
return Map;
}



    function parcelColors(p) {
        if(p === "Other") return "tan";
        if(p === "Park / Rec Center") return "green";
        if(p === "Parking") return "grey";
        if(p === "Cemetery / Golf") return "darkgreen";
        if(p === "Religous") return "yellow";
        if(p === "Hospital") return "pink";
        if(p === "Vacant") return "darkbrown";
        return "grey";
    }

function parcelLayerFun (Map) {
    function parcelColors(p) {
        if(p === "Other") return "tan";
        if(p === "Park / Rec Center") return "green";
        if(p === "Parking") return "grey";
        if(p === "Cemetery / Golf") return "darkgreen";
        if(p === "Religous") return "yellow";
        if(p === "Hospital") return "pink";
        if(p === "Vacant") return "darkbrown";
        return "grey";
    }

    function initstyle(feature) {
        return {
            fillColor: parcelColors(feature.properties.BC_TYPE),
            weight: 2,
            opacity: 1,
            color: 'NA',  //Outline color
            fillOpacity: 1,
        };
    }

    Map.parcelLayer = L.geoJSON(null, {
        style: initstyle,
        onEachFeature: function(feature, layer) {
            layer.zoningCode = feature.properties.LONG_CODE;
            layer.height = feature.properties['height'];
            layer.bcType = feature.properties.BC_TYPE;
            layer.owner = feature.properties.OWNER1;
            layer.addy = feature.properties.ADDRESS;
            layer.commerce = feature.properties['amenity'];
            layer.shopname = feature.properties['name'];
            layer.addEventListener("click", highlightFeature);
            if(isNaN(feature.properties['name']) == true){
                layer.bindPopup(feature.properties['name']);

            }
        },
    }).addTo(Map);
}



export {
    initializeMap,
    parcelLayerFun,
    parcelColors,
};

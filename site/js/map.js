function initializeMap () {
    const southWest = L.latLng(39.960774719794294, -75.14086971621691),
    northEast = L.latLng(39.9825160929394, -75.11223550383296),
    bounds = L.latLngBounds(southWest, northEast);

    let Map = L.map('fish-map', { maxBounds: bounds, maxZoom: 19, minZoom: 14.4 }).setView([39.9731, -75.1274], 14.4);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(Map);

function parcelColors(p) {
    if(p === "CITY_OF_PHILA") return "blue";
    if(p === "COMMERCIAL_PROPERTY") return "orange";
    return "grey";
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





Map.parcelLayer = L.geoJSON(null, {
    style: polystyle, 
    onEachFeature: function(feature, layer) {
        layer.addEventListener("mouseover", highlight_feature);
        layer.addEventListener("mouseout", reset_highlight);
    },
}).addTo(Map);

function highlight_feature(e) {
    e.target.setStyle({weight: 5, color: "yellow", fillOpacity: 0.5});
    e.target.bringToFront();
}

function reset_highlight(e) {
    geojson.resetStyle(e.target);
}

    return Map;
}



export {
    initializeMap,
 };
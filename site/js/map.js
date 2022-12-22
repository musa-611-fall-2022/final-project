function initMap() {
    const map = L.map('map').setView([39.95, -75.16], 10);

    const mapboxAccount = 'spriteo';
    const mapboxStyle = 'clbgshak1000014p4n9v0a2wk';
    const mapboxToken = 'sk.eyJ1Ijoic3ByaXRlbyIsImEiOiJjbGJnc2t6NDUwaHltM3ZtdWFwNWxxN3E2In0.2w8s_It9zDX7aaQXzo6Qyg';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);
  
    return map;
}
  
function updateUserPositionOn(map, pos) {
    map.setView([pos.coords.latitude, pos.coords.longitude], 15);

    L.marker([pos.coords.latitude, pos.coords.longitude])
        .addTo(map)
        .bindPopup('You are here.')
        .openPopup();
}
  
export {
initMap,
updateUserPositionOn,
};
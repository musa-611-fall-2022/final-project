/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-12-11 02:47:44
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-11 04:05:34
 * @FilePath: \final-project\site\js\map.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//click on a facility on a map, and then sends the data to other parts of the code to be used as needed.

function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.FLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
        fillColor: '#EB0000',
        fillOpacity: 0.9,
        stroke: false,
    },
    }).addTo(map);

    map.positionLayer = L.geoJSON(null).addTo(map);

    return map;
}


function showFonMap(map, name)
{
    fetch('./data/Mathare_Slum.geojson')
.then(response => {
    // Parse the response into a JavaScript object
    return response.json();
})
.then(geojson => {
    if (map.FLayer !== undefined){
        map.removeLayer(map.FLayer);
        };
    if (map.pLayer !== undefined){
        map.removeLayer(map.pLayer);
        };
    // Save the resulting object as a variable
    const filteredGeojson = {
        type: 'FeatureCollection',
        features: geojson.features.filter(f =>{
            let fname = f.properties['Name'].toLowerCase();
            let ftype = f.properties['FacilityTy'].toLowerCase();
            let input = name.toLowerCase();
            let hastext = fname.includes(input) || ftype.includes(input);
            return hastext;
        }),
    };

      // Add the filtered GeoJSON points to the map as markers
    map.FLayer=L.geoJSON(filteredGeojson, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
            color: '#ad4b5a', // Red
            Opacity: 0.8,
            fillColor: '#ad4b5a', // Red
            fillOpacity: 0.8,
            radius: 5,
        },
    }).addTo(map);
    // Calculate the bounds of the added geoJSON layer
    const bounds = map.FLayer.getBounds();

    // Set the map's center and zoom level based on the bounds of the added layer
    map.fitBounds(bounds);
    map.FLayer.addEventListener('click', (evt) =>{
        
        // leave only cliked point
        if (map.pLayer !== undefined){
            map.removeLayer(map.pLayer);
            };
        map.pLayer = L.circleMarker(evt.latlng).addTo(map);
        map.FLayer.addLayer(map.pLayer);
        map.pLayer.setStyle({
            icon: "https://maps.gstatic.com/mapfiles/markers2/marker.png",
            color: '#6195ed', 
            fillColor: '#ad4b5a', // Red
            fillOpacity: 0.5,
            radius: 5,
        });
    
        //popup bar
        let popup = document.getElementById("popUp");
        const facTyElement = document.getElementById('tp');
        const facNameElement = document.getElementById('nam');
        const facVillyElement = document.getElementById('villy');
        const facType = `Facility Type: ${evt.layer.feature.properties['FacilityTy']}`;
        const facName = `Facility Name: ${evt.layer.feature.properties['Name']}`;
        const facVillage = `Facility Village: ${evt.layer.feature.properties['Village']}`;
        facTyElement.innerHTML = facType;
        facNameElement.innerHTML = facName;
        facVillyElement.innerHTML = facVillage;
        popup.classList.add("open-popUp");
    });
})};




export {
    initMap,
    showFonMap,

};
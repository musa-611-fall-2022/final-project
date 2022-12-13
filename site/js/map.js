export let thegallery;

function highlightFeature(e) {
  var layerss=e.layer;
if(e.layer.options['color']=="#FF94B1"){
  layerss.setStyle({
    radius: 7,
    color: "#0000CD",
    stroke: true,
    opacity: 0.5,
    weight: 2,
  });
  if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
      layerss.bringToFront();
  }}else{ layerss.setStyle({
    radius: 7,
    color: "#FF94B1",
    stroke: true,
    opacity: 0.5,
    weight: 2,
  });}
}


let map;
function initMap() {    
map = L.map('map', { maxZoom: 22, preferCanvas: true  }).setView([40.748717, -73.999580], 11);
const mapboxAccount = 'mapbox';
const mapboxStyle = 'light-v10';
const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);
    map.galleryLayer = L.geoJSON(null, {
        pointToLayer: (point, latlng) => L.circleMarker(latlng),
        style: {
          radius: 7,
          color: "#FF94B1",
          stroke: true,
          opacity: 0.5,
          weight: 2,
        },
      })
      .on("click", highlightFeature)
      .bindTooltip(Layer => Layer.feature.properties['name'],)
      .addTo(map);
      map.positionLayer = L.geoJSON(null).addTo(map);
      map.selectedLayer = L.geoJSON(null).addTo(map);
      return map;
    }

  


      function updateUserPositionOn(map, pos) {
        map.positionLayer.addData({
          'type': 'Point',
          'coordinates': [pos.coords.longitude, pos.coords.latitude],
        });
        map.setView([pos.coords.latitude, pos.coords.longitude], 19);
      }

      function updateselectedgalleryPositionOn(gallery) {
        baseMap.selectedLayer.addData({
          'type': 'Point',
          'coordinates': [gallery.geometry[0],gallery.geometry[1]],
        });
        /*let lnglat=gallery.geometry['coordinates'];
        let longitude=Number(lnglat.split(",")[0]);
        let latitude=Number(lnglat.split(",")[1]);*/
        baseMap.setView([gallery.geometry[1],gallery.geometry[0]], 10);
      }
       
      export {
        initMap,
        updateUserPositionOn,
        highlightFeature,
        updateselectedgalleryPositionOn,
      };
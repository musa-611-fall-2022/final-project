function loadResearchData(currentSlideIndex) {
  
  if(currentSlideIndex == 3) {
    L.geoJSON(eastasiancluster, {
      style: {fill: null, color: 'black'},
    }).addTo(layerGroup);
    };
  else if(currentSlideIndex == 4) {
    L.geoJSON(southasiancluster, {
      style: {fill: null, color: 'black'},
    }).addTo(map);
    };
  else if(currentSlideIndex == 5) {
    L.geoJSON(southeastasiancluster, {
      style: {fill: null, color: 'black'},
    }).addTo(map);
  }
}
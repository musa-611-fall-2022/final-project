import eastasiancluster from '../data/EastAsianCluster.geojson.js';
import southasiancluster from '../data/SouthAsianCluster.geojson.js';
import southeastasiancluster from '../data/SoutheastAsianCluster.geojson.js';


//Jingyi reccomended going through the data this way
//function filterResearchData(data) {
//  const cat1 = [];
//  const cat2 = [];
//  const cat3 = [];
//  const cat4 = []
//  // iterate over data
//  if(data.col.field == cat1) {
//    return{
//      'type':
//    }
//    cat1.append();
//  } else if(data.col.field == cat2){
//    cat2.append();
//  } else if(data.col.field == cat3){
//    cat3.append()
//  } else if(data.col.field == cat4){
//
//  }
//}

const clusterTypeColors = {
  "high frequency high clustering":"#00FFDB",
  "high frequency low clustering":"#00A3FF",
  "low frequency low clustering":"#5B00FF",
  "No_Relationship": "#FF00A4",
}

function loadResearchData(currentSlideIndex) {
  layerGroup.clearLayers(); 
  if(currentSlideIndex == 3) {
    L.geoJSON(eastasiancluster, {
      style: (feature) => {
        const ct = "high frequency high clustering"; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).addTo(layerGroup);
  } else if(currentSlideIndex == 4) {
    L.geoJSON(southasiancluster, {
      style: {fill: null, color: 'black'},
    }).addTo(layerGroup);
  } else if(currentSlideIndex == 5) {
    L.geoJSON(southeastasiancluster, {
      style: {fill: null, color: 'black'},
    }).addTo(layerGroup);
  }
}

export {
  loadResearchData
}
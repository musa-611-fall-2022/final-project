//http://data-phl.opendata.arcgis.com/datasets/5146960d4d014f2396cb82f31cd82dfe_0.geojson
import {downloadRestaurants,downloadRestaurants1, downloadFarmersMarkets, downloadParks, downloadPicnics} from '../js/data.js'
import {initMap} from '../js/map.js'

//Phila outline? do we need that?
// foursquare API key = "fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I="

const philaMap = initMap();

function onRestaurantsLoad(data) {
  philaMap.restaurantsLayer.addData(data);
  }

function onFarmersMarketsLoad(data) {
  philaMap.farmersMarketsLayer.addData(data);
  }

function onParksLoad(data) {
 philaMap.parksLayer.addData(data); 
}

function onPicnicsLoad(data) {
  philaMap.picnicsLayer.addData(data);
}


downloadRestaurants(onRestaurantsLoad);
downloadFarmersMarkets(onFarmersMarketsLoad);
downloadParks(onParksLoad);
downloadPicnics(onPicnicsLoad);

function onRandomIndex(data) {
  return data;//UGH
  }

//const restaurantsData
const restaurantsData = downloadRestaurants(onRandomIndex);
const farmersMarketsData = downloadFarmersMarkets(onRandomIndex);
const picnicsData = downloadPicnics(onRandomIndex);
const parksData = downloadParks(onRandomIndex);


const dateCheckboxes = document.querySelectorAll('.date-checkbox');
//const dataDisplayed = null;

for (const checkbox of dateCheckboxes){
  checkbox.addEventListener('change', (evt) => {
      if (evt.target.checked){
          console.log('you clicked on the checkbox ' + checkbox.value);
          const dataset = checkbox.value;
          const black = "#000000";
          //here I clear all the layers, but need a way to not lol
          //philaMap.farmersMarketsLayer.clearLayers();
          //philaMap.parksLayer.clearLayers();
          //philaMap.picnicsLayer.clearLayers();
          if (dataset == "picnicTables"){
            downloadPicnics(onPicnicsLoad);
          } else {
            if (dataset == "parks") {
              downloadParks(onParksLoad);
            } else {
              downloadFarmersMarkets(onFarmersMarketsLoad);
            }
          }
      } else {
        const dataset = checkbox.value;
          console.log('you unclicked the checkbox ' + dataset)
          if (dataset == "picnicTables"){
            philaMap.picnicsLayer.clearLayers();
          } else {
            if (dataset == "parks") {
              philaMap.parksLayer.clearLayers();
            } else {
              philaMap.farmersMarketsLayer.clearLayers();
            }
          }
      }
      
  })
};

function goRandom() {
  const number = Math.random();
  const farmersMarketIndex = Math.floor(number*42);
  const picnicsIndex = Math.floor(number*261);
  console.log(farmersMarketIndex);
  console.log(picnicsIndex);
};

const randomButton = document.querySelector('.random-button');
randomButton.addEventListener('click', goRandom);



// Expose variables to the global scope
//window.picnics = picnicsFC;
window.mapview = philaMap;
window.restaurants = restaurantsData;
window.farmersMarkets = farmersMarketsData;
window.parks = parksData;
window.picnics = picnicsData;
window.try = downloadRestaurants1;
// might add a window.phila = phila; for an outline map

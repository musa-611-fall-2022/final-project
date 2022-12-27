//http://data-phl.opendata.arcgis.com/datasets/5146960d4d014f2396cb82f31cd82dfe_0.geojson
import { downloadRestaurants_centerCity,downloadRestaurants_fishtown, downloadRestaurants_gradHospital,downloadRestaurants_southPhila,downloadRestaurants_NWPhila,downloadRestaurants_kensington,downloadRestaurants_upperNWPhila,downloadRestaurants_germantown,downloadRestaurants_roxborough,downloadRestaurants_mtAiry,downloadRestaurants_NPhila,downloadRestaurants_extraNPhila,downloadRestaurants_farNEPhila,downloadRestaurants_uniCity,downloadRestaurants_WParkside,downloadRestaurants_cobbsCreek,downloadRestaurants_kingsessing,downloadRestaurants_elmwoodPark,downloadRestaurants_eastwick, downloadFarmersMarkets, downloadParks, downloadPicnics } from '../js/data.js';
import { initMap } from '../js/map.js';
import { showPickedInfo } from '../js/picked_list.js';

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

function downloadAllRestaurants() {
  downloadRestaurants_centerCity(onRestaurantsLoad);
  downloadRestaurants_fishtown(onRestaurantsLoad);
  downloadRestaurants_gradHospital(onRestaurantsLoad);
  downloadRestaurants_southPhila(onRestaurantsLoad);
  downloadRestaurants_NWPhila(onRestaurantsLoad);
  downloadRestaurants_kensington(onRestaurantsLoad);
  downloadRestaurants_upperNWPhila(onRestaurantsLoad);
  downloadRestaurants_germantown(onRestaurantsLoad);
  downloadRestaurants_roxborough(onRestaurantsLoad);
  downloadRestaurants_mtAiry(onRestaurantsLoad);
  downloadRestaurants_NPhila(onRestaurantsLoad);
  downloadRestaurants_extraNPhila(onRestaurantsLoad);
  downloadRestaurants_farNEPhila(onRestaurantsLoad);
  downloadRestaurants_uniCity(onRestaurantsLoad);
  downloadRestaurants_WParkside(onRestaurantsLoad);
  downloadRestaurants_cobbsCreek(onRestaurantsLoad);
  downloadRestaurants_kingsessing(onRestaurantsLoad);
  downloadRestaurants_elmwoodPark(onRestaurantsLoad);
  downloadRestaurants_eastwick(onRestaurantsLoad);
}

downloadAllRestaurants();

function goRandom() {
  const number = Math.random();
  let index = Math.floor(number*2000);
  if (index%2==0) {
    index = index+1;
  }
  console.log(index);
  let theOne = philaMap.restaurantsLayer._layers[index].feature;
  return theOne;
}

function onRandomIndex() {
  let theOne = goRandom();
  console.log(theOne);
  philaMap.restaurantsLayer.clearLayers();
  philaMap.restaurantsLayer.addData(theOne);
  return theOne;
}

const randomButton = document.querySelector('.random-button');

randomButton.addEventListener('click', () => {
  const theOne = onRandomIndex();
  randomButton.value = "Picked!";
  const messageArea = document.querySelector('#picked-message');
  const infoArea = document.querySelector('#picked-info');
  showPickedInfo(theOne, messageArea, infoArea);
  console.log(messageArea);
  console.log(infoArea);
});

const dateCheckboxes = document.querySelectorAll('.date-checkbox');

for (const checkbox of dateCheckboxes){
  checkbox.addEventListener('change', (evt) => {
      if (evt.target.checked){
          console.log('you clicked on the checkbox ' + checkbox.value);
          const dataset = checkbox.value;
          const black = "#000000";
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
  });
}

//exposing variables to the global scope
window.mapview = philaMap;

import { downloadRestaurantsCenterCity, downloadRestaurantsFishtown, downloadRestaurantsGradHospital, downloadRestaurantsSouthPhila, downloadRestaurantsNwPhila, downloadRestaurantsKensington, downloadRestaurantsUpperNwPhila, downloadRestaurantsGermantown, downloadRestaurantsRoxborough, downloadRestaurantsMtAiry, downloadRestaurantsNoPhila, downloadRestaurantsExtraNoPhila, downloadRestaurantsFarNePhila, downloadRestaurantsUniCity, downloadRestaurantsWestParkside, downloadRestaurantsCobbsCreek, downloadRestaurantsKingsessing, downloadRestaurantsElmwoodPark, downloadRestaurantsEastwick, downloadFarmersMarkets, downloadPicnics } from '../js/data.js';
import { initMap } from '../js/map.js';
import { showPickedInfo } from '../js/picked_list.js';

// foursquare API key = "fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I="

const philaMap = initMap();

// add maplayers when the data loads
function onRestaurantsLoad(data) {
  philaMap.restaurantsLayer.addData(data);
  }

function onFarmersMarketsLoad(data) {
  philaMap.farmersMarketsLayer.addData(data);
  }

function onPicnicsLoad(data) {
  philaMap.picnicsLayer.addData(data);
}

function downloadAllRestaurants() {
  downloadRestaurantsCenterCity(onRestaurantsLoad);
  downloadRestaurantsFishtown(onRestaurantsLoad);
  downloadRestaurantsGradHospital(onRestaurantsLoad);
  downloadRestaurantsSouthPhila(onRestaurantsLoad);
  downloadRestaurantsNwPhila(onRestaurantsLoad);
  downloadRestaurantsKensington(onRestaurantsLoad);
  downloadRestaurantsUpperNwPhila(onRestaurantsLoad);
  downloadRestaurantsGermantown(onRestaurantsLoad);
  downloadRestaurantsRoxborough(onRestaurantsLoad);
  downloadRestaurantsMtAiry(onRestaurantsLoad);
  downloadRestaurantsNoPhila(onRestaurantsLoad);
  downloadRestaurantsExtraNoPhila(onRestaurantsLoad);
  downloadRestaurantsFarNePhila(onRestaurantsLoad);
  downloadRestaurantsUniCity(onRestaurantsLoad);
  downloadRestaurantsWestParkside(onRestaurantsLoad);
  downloadRestaurantsCobbsCreek(onRestaurantsLoad);
  downloadRestaurantsKingsessing(onRestaurantsLoad);
  downloadRestaurantsElmwoodPark(onRestaurantsLoad);
  downloadRestaurantsEastwick(onRestaurantsLoad);
}

//wrap all the restaurants loading in one neat function
downloadAllRestaurants();

//picks a random index to choose a restaurant from
function goRandom() {
  const number = Math.random();
  let index = Math.floor(number*2000);
  console.log(index);
  let theOne = philaMap.restaurantsLayer._layers[index];
  //foursquare data goes by steps of 2 and is sometimes odd, sometimes even
  if (theOne == undefined){
    index = index+1;
  }
  theOne = philaMap.restaurantsLayer._layers[index].feature;
  return theOne;
}

//display your random restaurant selection on the map
function onRandomIndex() {
  let theOne = goRandom();
  console.log(theOne);
  philaMap.restaurantsLayer.clearLayers();
  philaMap.restaurantsLayer.addData(theOne);
  return theOne;
}

const randomButton = document.querySelector('.random-button');

//display info and user instructions
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

//display parks markers on map when you want
for (const checkbox of dateCheckboxes){
  checkbox.addEventListener('change', (evt) => {
      if (evt.target.checked){
          console.log('you clicked on the checkbox ' + checkbox.value);
          const dataset = checkbox.value;
          //const black = "#000000";
          if (dataset == "picnicTables"){
            downloadPicnics(onPicnicsLoad);
          } else {
            downloadFarmersMarkets(onFarmersMarketsLoad);
          }
      } else {
        const dataset = checkbox.value;
          console.log('you unclicked the checkbox ' + dataset);
          if (dataset == "picnicTables"){
            philaMap.picnicsLayer.clearLayers();
          } else {
            philaMap.farmersMarketsLayer.clearLayers();
          }
      }
  });
}

//exposing variables to the global scope
window.mapview = philaMap;

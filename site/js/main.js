import filipinotown from '../data/seattle.js';
import { initializeSeattleMap, showFtOnMap } from './map.js';
import { showFtInList }  from './list.js';

console.log(filipinotown)

let seattleMap = initializeSeattleMap();
showFtOnMap(filipinotown, seattleMap);

let seattleList = document.querySelector('#seattle-list');
showFtInList(filipinotown, seattleList);


// let schoolGradeFilters = document.querySelectorAll('.seattle-checkbox');
// let schoolNameFilter = document.querySelector('#seattle-name-filter');

// function shouldShowPlace () {
//     let filteredPlaces = filipinotown;

//     const text = schoolNameFilter.value;
//     filteredPlaces = filteredPlaces.filter(function(place) {
//         const name = place['Name'].toLowerCase();
//         const hasText = name.includes(text);
//         return hasText;
//     });

//     return filteredPlaces;
// }

// schoolNameFilter.addEventListener('input', () => {
//     const filteredSchools = shouldShowPlace();
//     showFtOnMap(filteredPlaces, seattleMap);
//     showFtInList(filteredPlaces, placesList);
// });

window.filipinotown = filipinotown;
window.seattleMap = seattleMap;
// window.seattleList = seattleList;

export {
    filipinotown
}
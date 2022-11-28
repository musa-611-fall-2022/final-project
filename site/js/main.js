import filipinotown from '../data/filipinotown.js';
import { initializeSeattleMap, showPlacesOnMap } from './map.js';
import { showPlacesInList }  from './list.js';

let seattleMap = initializeSeattleMap();
showPlacesOnMap(filipinotown, seattleMap);

let seattleList = document.querySelector('#school-list');
showPlacesInList(filipinotown, seattleList);

let schoolGradeFilters = document.querySelectorAll('.school-checkbox');
let schoolNameFilter = document.querySelector('#school-name-filter');

function shouldShowPlace () {
    let filteredPlaces = filipinotown;

    const text = schoolNameFilter.value;
    filteredPlaces = filteredPlaces.filter(function(school) {
        const name = place['Name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    return filteredSchools;
}

schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showPlacesOnMap(filteredPlaces, seattleMap);
    showPlacesInList(filteredPlaces, placesList);
});

console.log(filipinotown)

window.filipinotown = filipinotown;
window.seattleMap = seattleMap;
window.seattleList = seattleList;
import { initMap, showFoodOnMap, showStopOnMap } from './map.js';
import { showStopInList, showFoodInList } from './stop-list.js';
import foods from '../data/food.js';
import stops from '../data/bus_stop_point.js'


//import { showFoodInList } from './food-list.js';

let map = initMap();
showFoodOnMap(foods, map);
showStopOnMap(stops, map);

let cuisineNameFilter = document.querySelector('#cuisine-name-filter');
let cuisinePopFilter = document.querySelectorAll('.cuisine-checkbox');
let foodList = document.querySelector('#cuisine-list');
showFoodInList(foods, foodList);

let stopList = document.querySelector('#stop-list');
let stopNameFilter = document.querySelector('#stop-name-filter');
let stopDirectionFilter = document.querySelectorAll('.direction-checkbox');
showStopInList(stops, stopList);

//Food
function getFilteredFood() {
    let filteredFood = foods.filter(function (food) {
        return food.properties["name"].toLowerCase().includes(cuisineNameFilter.value.toLowerCase());
    });

    for (const checkbox of cuisinePopFilter) {
        if (checkbox.checked) {
            filteredFood = filteredFood.filter(function (food) {
                const amenity = checkbox.value;
                const hasAmenity = food.properties['amenity'].includes(amenity);
                return hasAmenity;
            });
        }
    }


    return filteredFood;
}

for (const cb of cuisinePopFilter) {
    cb.addEventListener('change', () => {
        const filteredFood = getFilteredFood();
        showFoodOnMap(filteredFood, map);
        showFoodInList(filteredFood, foodList);
        window.foods = filteredFood;

    });
}

cuisineNameFilter.addEventListener('input', () => {
    const foods = getFilteredFood();
    showFoodOnMap(foods, map);
    showFoodInList(foods, foodList);
    window.foods = foods;
});

//Stops
function getFilteredStops() {
    let filteredStops = stops.filter(function (stop) {
        return stop.properties["stopname"].toLowerCase().includes(stopNameFilter.value.toLowerCase());
    });

    for (const checkbox of stopDirectionFilter) {
        if (checkbox.checked) {
            filteredStops = filteredStops.filter(function (stop) {
                const direction = checkbox.value;
                const hasDirection = stop.properties['directionn'].includes(direction);
                return hasDirection;
            });
        }
    }


    return filteredStops;
}

for (const cb of stopDirectionFilter) {
    cb.addEventListener('change', () => {
        const filteredStops = getFilteredStops();
        showStopOnMap(filteredStops, map);
        showStopInList(filteredStops, stopList);
        window.stops = filteredStops;

    });
}

stopNameFilter.addEventListener('input', () => {
    const stops = getFilteredStops();
    showStopOnMap(stops, map);
    showStopInList(stops, stopList);
    window.stops = stops;
});

window.map = map;

window.stopDirectionFilter = stopDirectionFilter;
window.stopNameFilter = stopNameFilter;
window.stopList = stopList;

window.cuisinePopFilter = cuisinePopFilter
window.cuisineNameFilter = cuisineNameFilter;
window.foodList = foodList;




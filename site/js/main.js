//  My workout diary
// ============================

// First of all, import functions from other JS files and link variables from html file.

import { initMap, updateUserPositionOn } from './map.js';

const map = initMap();
// const trackList = document.querySelector('.track-list');
const inputList = document.querySelector('.list');
const inputType = document.querySelector('.list_input--type');
// const Submit = document.querySelector('.')
const inputDifficulty = document.querySelector('.list_input--difficulty');
const inputDistance = document.querySelector('.list_input--distance');
const inputDuration = document.querySelector('.list_input--duration');
const workouts = [];
// let mapEvent;

// ============================

// Step 1: Get user's location and create a leaflet map

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when the user's position is successfully found.
function onUserPositionSuccess(pos) {
  updateUserPositionOn(map, pos);
}

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when there is an error in finding the user's position.
function onUserPositionFailure(err) {
  alert(`Sorry, we fail to get your position: ${err}`);
}

function setupGeolocationEvent() {
  navigator.geolocation.getCurrentPosition(
    onUserPositionSuccess,
    onUserPositionFailure,
  );
}

setupGeolocationEvent();


// Step 2: Clicked on map, show the input box to allow users input workout information

// Close track form

// toggle('switch--hidden');


let mapEvent;

map.on('click', function(Event){
  mapEvent = Event;
  // trackList.classList.add('hidden');
  inputList.classList.remove('hidden');

  inputDistance.focus();

  // Show popup when user click a location
  // const {lat, lng} = mapEvent.latlng;

  // L.marker([lat, lng])
  // .addTo(map)
  // .bindPopup(
  //   L.popup({
  //     maxWidth: 250,
  //     minWidth: 100,
  //     autoClose: true,
  //     closeOnClick: false,
  //     className:'popup',
  //   })
  // )
  // .setPopupContent('Create a New Workout Here')
  // .openPopup();

});


// Step 3: Submit workout information

function showWorkoutOnMap(map, p) {
  map.setView([p.lat, p.lng], 15);

  L.marker([p.lat, p.lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth:100,
          autoClose:false,
          closeOnClick:false
        }))
        .setPopupContent(
          p.difficulty+p.type+"for"+p.distance+"miles"
        )
      .openPopup();
}

function showWorkoutInList(workout){
  let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <div class="workout_details">
        <img src="./asset/${workout.type}.png" alt="Logo" class="workout_logo"/>
        <span class="workout_difficulty">${workout.difficulty}</span>
        <span class="workout_type">${workout.type}</span>
        <img src="./asset/Distance.png" alt="Logo" class="workout_logo"/>        
        <span class="workout_distance">${workout.distance}</span>
        <span class="workout_unit">miles</span>
        <img src="./asset/Time.png" alt="Logo" class="workout_logo"/>    
        <span class="workout_duration">${workout.duration}</span>
        <span class="workout_unit">min</span>
      </div>
  `;

  // list.innerHTML += html;
  inputList.insertAdjacentHTML('afterend', html);
}

inputList.addEventListener('click', function(e){
  e.preventDefault();

  console.log(mapEvent);
  
  // Get data from input box
  const type = inputType.value;
  const difficulty = inputDifficulty.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;
  const {lat, lng} = mapEvent.latlng;

  const workout = {type, difficulty, distance, duration, lat, lng};
  
  //Check data
  if(!Number.isFinite(distance) || !Number.isFinite(duration))
  return alert('Sorry, invalid input.')

  if(distance <= 0 || duration <= 0 ) 
  return alert('Sorry, invalid input.')

  //Add this new object to workout array
  workouts.push(workout);

  //Show workout on map
  showWorkoutOnMap(map, workout);

  //Show workout in list
  showWorkoutInList(workout);

  //Clear input box
  inputDistance.value = inputDuration.value = "";
});


const houseNameEl = document.getElementById('house-name');
const cityNameEl = document.getElementById('city-name');
const houseNotesEl = document.getElementById('house-notes');
const saveHouseNotesEl = document.getElementById('save-house-notes');

function showHouseDataInForm(house, notes) {
  const houseName = house.properties['RESNAME'];
  const cityName = house.properties['City'];
  houseNameEl.innerHTML = houseName;
  cityNameEl.innerHTML = cityName;
  houseNotesEl.value = notes;
}

function onSaveButtonClicked() {
  const note = houseNotesEl.value;
  const saveClickedEvent = new CustomEvent('save-clicked', { detail: { note } });
  window.dispatchEvent(saveClickedEvent);
}

function initHouseInfoForm() {
  saveHouseNotesEl.addEventListener('click', onSaveButtonClicked);
}

export {
  showHouseDataInForm,
  initHouseInfoForm,
};
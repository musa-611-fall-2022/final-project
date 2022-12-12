const houseNameEl = document.getElementById('house-name');
const houseNotesEl = document.getElementById('house-notes');
const saveHouseNotesEl = document.getElementById('save-house-notes');

function showHouseDataInForm(house, notes) {
  const houseName = house.properties['RESNAME'];
  houseNameEl.innerHTML = houseName;
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
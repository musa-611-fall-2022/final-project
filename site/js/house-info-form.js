const houseNameEl = document.getElementById('house-name');
const cityNameEl = document.getElementById('house-city');
const urlEl = document.getElementById('house-url');
const typeEl = document.getElementById('house-type');
const houseNotesEl = document.getElementById('house-notes');
const saveHouseNotesEl = document.getElementById('save-house-notes');

function urlToLink (str){
  let re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;

  str = str.replace(re, function(website){
      return "<a href='" + website +"' target='_blank'>" + website + "</a>";
  });
  return str;
}

function showHouseDataInForm(house, notes) {
  const houseName = "🏡Name: "+house.properties['RESNAME'];
  const cityName = "🏙️City: "+house.properties['City'];
  const url = "📃Check the archive: "+urlToLink(house.properties['NARA_URL']);
  const houseType = "🌉Type: "+house.properties['ResType'];
  houseNameEl.innerHTML = houseName;
  cityNameEl.innerHTML = cityName;
  urlEl.innerHTML = url;
  typeEl.innerHTML = houseType;
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
import filipinotown from '../data/seattle.js';
import { initializeSeattleMap, showFtOnMap } from './map.js';
import { showFtInList }  from './list.js';

let seattleMap = initializeSeattleMap();
showFtOnMap(filipinotown, seattleMap);

let seattleList = document.querySelector('#seattle-list');
showFtInList(filipinotown, seattleList);

let seattleTypeFilter = document.querySelectorAll('.seattle-checkbox');
let seattleNameFilter = document.querySelector('#seattle-name-filter');

function shouldShowSeattle () {
    let filteredFt = filipinotown;
    const text = seattleNameFilter.value;
    filteredFt = filteredFt.filter(function(seattle) {
        const name = seattle.properties.Name.toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });
    for (const checkbox of seattleTypeFilter) {
        if (checkbox.checked) {
            filteredFt = filteredFt.filter(function(seattle) {
                const type = checkbox.value;
                const hasType = seattle.properties.Type === type;
                return hasType;
            });
        }
    }
    return filteredFt;
}

for (const cb of seattleTypeFilter) {
    cb.addEventListener('change', () => {
        const filteredFt = shouldShowSeattle();
        showFtOnMap(filteredFt, seattleMap);
        showFtInList(filteredFt, seattleList);
    });
}

seattleNameFilter.addEventListener('input', () => {
    const filteredFt = shouldShowSeattle();
    showFtOnMap(filteredFt, seattleMap);
    showFtInList(filteredFt, seattleList);
});

window.filipinotown = filipinotown;
window.seattleMap = seattleMap;
window.seattleList = seattleList;
window.seattleNameFilter = seattleNameFilter;
window.seattleTypeFilter = seattleTypeFilter;

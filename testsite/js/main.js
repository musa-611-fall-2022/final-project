import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schools-maps.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector("#school-list");
showSchoolsInList(schools, schoolList);

//All is for all the check boxes
let schoolGradeFilters = document.querySelectorAll('.grade-checkbox');

//No all because we only have one text box
let schoolNameFilter = document.querySelector('#school-name-input');

function getFilteredSchools() {
    let filteredSchools = schools;

    // filter based on school name
    const text = schoolNameFilter.value.toLowerCase();
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school["name"].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // filter based on school level
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (school) {
                const level = checkbox.value;
                const hasLevel = school["School Level"].includes(level);
                return hasLevel;
            });
        }
    }

    return filteredSchools;
}

for (const cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoolList);
    });
}

schoolNameFilter.addEventListener('input', () => {
   const filteredSchools = getFilteredSchools();
   showSchoolsOnMap(filteredSchools, schoolMap);
   showSchoolsInList(filteredSchools, schoolList);
});


// Expose variables to the global scope
window.schools = schools;
window.schoolList = schoolList;
window.schoolLevelFilters = schoolGradeFilters;
window.schoolMap = schoolMap;
window.schoolNameFilter = schoolNameFilter;
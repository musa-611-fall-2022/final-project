import filipinotown from '../data/filipinotown.js';
// import { initializeSchoolMap, showSchoolsOnMap } from './school-map.js';
// import { showSchoolsInList }  from './school-list.js';

window.filipinotown = filipinotown;

// let seattleMap = initializeSeattleMap();
// showPlacesOnMap(filipinotown, seattleMap);

console.log(filipinotown)

// let schoolList = document.querySelector('#school-list');
// showSchoolsInList(schools, schoolList);

// let schoolGradeFilters = document.querySelectorAll('.school-checkbox');
// let schoolNameFilter = document.querySelector('#school-name-filter');

// function shouldShowSchool () {
//     let filteredSchools = schools;

//     const text = schoolNameFilter.value;
//     filteredSchools = filteredSchools.filter(function(school) {
//         const name = school['name'].toLowerCase();
//         const hasText = name.includes(text);
//         return hasText;
//     });

//     for (const checkbox of schoolGradeFilters) {
//         if (checkbox.checked) {
//             filteredSchools = filteredSchools.filter(function (school) {
//                 const schoolType = checkbox.value;
//                 if (school[schoolType] === "1") {
//                     return true;
//                 } else {
//                     return false;
//                 }

//             });
//         }
//     }

//     return filteredSchools;
// }

// for (const cb of schoolGradeFilters) {
//     cb.addEventListener('change', () => {
//         const filteredSchools = shouldShowSchool();
//         showSchoolsOnMap(filteredSchools, schoolMap);
//         showSchoolsInList(filteredSchools, schoolList);
//     });
// }

// schoolNameFilter.addEventListener('input', () => {
//     const filteredSchools = shouldShowSchool();
//     showSchoolsOnMap(filteredSchools, schoolMap);
//     showSchoolsInList(filteredSchools, schoolList);
// });

// window.filipinotown = filipinotown;
// window.schoolMap = schoolMap;
// window.schoolList = schoolList;
// window.schoolNameFilter = schoolNameFilter;
// window.schoolGradeFilters = schoolGradeFilters;

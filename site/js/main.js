// fetch(`https://mobiladelphia.herokuapp.com/test-query/3`)
// .then(resp => {
//   if(resp.status === 200) {
//     const data = resp.json();
//     return data;
//   } else {
//     //
//   }
// })
// .then(data => {
//   console.log(data);
// });

/* =================================================
Main.js deals with the actions that function on global scale,
defines global objects,
and is a coordinator of all different modules

@auther: Jie Li
@date: 12/08/2022
================================================= */

import { initMap, addBlockGroups } from "./display-map.js";

// Create map
const map = initMap();

addBlockGroups(map);

/* ==========
Objects to store params for API
=========== */

// Toggle display params
export const toggleDisplayParam = {
  groupBy: "origin_geoid", // default to departures
  displayVar: "count",
}

// Filter params
export const filterParams = {
  categoricalVars: [
    {
      varName: "primary_mode",
      filteredCategories: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      varName: "trip_purpose",
      filteredCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  ],
  continuousVars: [
    {
      varName: "trip_taker_age",
      lowerBound: 0,
      upperBound: 100,
    },
    {
      varName: "trip_taker_income",
      lowerBound: 0,
      upperBound: 1000000000,
    }
  ]
}
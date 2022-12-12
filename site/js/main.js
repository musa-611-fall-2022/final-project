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
Define some constant objects
=========== */

// All variables used in filter
const continuousFilterVars = [
  'trip_start_time',
  'trip_end_time',
  'trip_duration_minutes',
  'trip_distance_miles',
];
const categoricalFilterVars = [
  'trip_purpose',
  'primary_mode',
  'trip_taker_available_vehicles',
  'origin_geoid',
  'destination_geoid',
];

// Dictionary for continuous filter variables (used to form the slider)
const continuousVarsDict = {
  trip_start_time: {
    displayName: 'Departure hour',
    min: 0,
    max: 24,
  },
  trip_end_time: {
    displayName: 'Arrival hour',
    min: 0,
    max: 24,
  },
  trip_duration_minutes: {
    displayName: 'Duration (min)',
    min: 0,
    max: 182,
  },
  trip_distance_miles: {
    displayName: 'Distance (mi)',
    min: 0,
    max: 31,
  },
}
// Dictionary for categorical filter variables
// const categoricalVarsDict = {
//   trip_purpose: {
//     displayName: 'Purpose',
//     factors: {

//     }
//   }
// }

// Possible variables for the map display
// There are three types of display variables, 
// and for each one, different information needs to be recorded
const mapDisplayVars = {
  meanType: [
    {
      varName: 'trip_duration_minutes', 
      displayName: 'Duration (min)',
    },
    {
      varName: 'trip_distance_miles',
      displayName: 'Distance (mi)',
    }
  ],
  ratioType: [
    {
      varName: 'primary_mode',
      displayName: 'Mode',
      factors: {
        1: 'Private Auto',
        3: 'Walking',
        4: 'Biking', 
        5: 'TNC',
        6: 'Transit',
      }
    },
    {
      varName: 'trip_purpose',
      displayName: 'Purpose',
      factors: {
        3: 'Work',
        4: 'Eat',
        5: 'Shop',
        7: 'Recreation',
      }
    }
  ],
  countType: [
    {
      displayName: 'Count',
    }
  ],
}

/* ==========
Objects to store display params
=========== */

export const toggleDisplayParams = {
  groupBy: "origin_geoid", // default to departures
  displayType: 'count', // either count, mean, or ratio
  displayVar: null, // if count, then null
  displayFactor: null, // only applies to ratios
}


/* ==========
Objects to store filter params
=========== */

// Storing filter params regarding continuous vars
let continuousFilterParams = {};
for(let filterVar of continuousFilterVars) {
  continuousFilterParams[filterVar] = {
    varName: filterVar,
    lowerBound: continuousVarsDict[filterVar].min,
    upperBound: continuousVarsDict[filterVar].max,
    isApplied: false,
  };
}
// Storing filter params regarding categorical vars
let categoricalFilterParams = {};
for(let filterVar of categoricalFilterVars) {
  categoricalFilterParams[filterVar] = {
    varName: filterVar,
    selectedCategories: [],
    isApplied: false,
  };
}
// Storing filter params regarding relation with home/work locations
const homeWorkFilterParams = {
  startFromHome: { filterName: 'startFromHome', filterSQL: 'origin_geoid = home_geoid', isApplied: false },
  startFromWork: { filterName: 'startFromWork', filterSQL: 'origin_geoid = work_geoid', isApplied: false },
  endAtHome: { filterName: 'endAtHome', filterSQL: 'destination_geoid = home_geoid', isApplied: false },
  endAtWork: { filterName: 'endAtWork', filterSQL: 'destination_geoid = work_geoid', isApplied: false },
}

// Final object storing all filter params
export const filterParams = {
  continuousVars: continuousFilterParams,
  categoricalVars: categoricalFilterParams,
  homeWork: homeWorkFilterParams,
}

/* ==========
For Toggle Display section, add HTML elements and add recorders
=========== */

import { addDisplayVarsEl } from "./add-html.js";

// Add a series of checkboxes, denoting which variable to display and how
const toggleDisplayVarsGroupEl = document.querySelector('#toggle-display-vars');

// Add 'count'
addDisplayVarsEl(toggleDisplayVarsGroupEl, 'count', null, null, `<span class="italic strong">Count</span>`);

// 'mean' type
for(const displayVar of mapDisplayVars.meanType) {
  addDisplayVarsEl(
    toggleDisplayVarsGroupEl, 
    'mean', 
    displayVar.varName, 
    null, 
    `<span class="italic strong">Mean</span> ${displayVar.displayName}`,
  );
}

// 'ratio' type
for(const displayVar of mapDisplayVars.ratioType) {
  for(const factorKey of Object.keys(displayVar.factors)) {
    addDisplayVarsEl(
      toggleDisplayVarsGroupEl,
      'ratio',
      displayVar.varName,
      factorKey,
      `<span class="italic strong">${displayVar.displayName} split</span> ${displayVar.factors[factorKey]}`,
    )
  }
}

// Record map display variable || and collapse the window
const displayVarOptionsEl = toggleDisplayVarsGroupEl.getElementsByClassName('cb-invisible');
for(const cbEl of displayVarOptionsEl) {
  cbEl.addEventListener('click', ( ) => {
    toggleDisplayParams.displayType = cbEl.displayType;

    toggleDisplayParams.displayVar = cbEl.value;
    if(cbEl.value === 'null') toggleDisplayParams.displayVar = null;
    
    toggleDisplayParams.displayFactor = cbEl.displayFactor;
    if(cbEl.displayFactor === 'null') toggleDisplayParams.displayFactor = null;
    
    console.log(toggleDisplayParams);

    // Collapse the window by simulating a click (after a short period of time)
    setTimeout(( ) => { document.querySelector('#display-var-button').click() }, 250);
  })

  // By default click on the first optin
  if(cbEl.displayType == 'count') cbEl.checked = true;
}

// Record group-by element: by departure or by arrival
const toggleDisplayToFromGroupEl = document.querySelector('#toggle-display-tofrom');
const departOrArriveOptionsEl = toggleDisplayToFromGroupEl.getElementsByClassName("cb-invisible");
for(const cbEl of departOrArriveOptionsEl) {
  cbEl.addEventListener('click', ( ) => {
    toggleDisplayParams.groupBy = cbEl.value;
    console.log(toggleDisplayParams);
  })

  // by default, click on Departures
  if(cbEl.value === 'origin_geoid') {
    cbEl.click();
  }
}

/* ==========
For continuous filters, add sliders and Recorders
=========== */

import { addSliderFilterEl } from "./add-html.js";
import { addContinuousFilterRecorder, addResetToSliders } from "./filter.js";

// Filter panel element
const filterPanelEl = document.querySelector("#filter-panel");

// Add the slider HTML elements
for(const filterVar of continuousFilterVars) {
  addSliderFilterEl(
    filterPanelEl,
    continuousVarsDict[filterVar].displayName,
    filterVar + '-slider',
    continuousVarsDict[filterVar].min,
    continuousVarsDict[filterVar].max,
  )
}

// Add recorders
for(const filterVar of continuousFilterVars) {
  addContinuousFilterRecorder(filterVar);
}

// Add resetters
addResetToSliders();

/* ==========
Construct WHERE clause
=========== */

// Returns where clause (filters) for SQL query
function constructWhereClause() {
  let whereClause = ``;

  // First deal with continuous variables
  for(const filter of filterParams.continuousVars) {
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.varName} BETWEEN ${filter.lowerBound} AND ${filter.upperBound})`;
      whereClause += thisWhere;
    }
  }

  // Then deal with categorical variables
  for(const filter of filterParams.categoricalVars) {
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.varName} IN (${filter.selectedCategories.join(', ')}))`;
      whereClause += thisWhere;
    }
  }

  // Then deal with home/work filters
  for(const filter of filterParams.homeWork) {
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.filterSQL})`;
      whereClause += thisWhere;
    }
  }

  // Return; remove the first " AND "
  if(whereClause === ``) {
    return `WHERE 1`;
  } else {
    return `WHERE ${whereClause.substring(5)}`;
  }
}


/* ==========
Call API on confirm button click
================ */

function onConfirmButtonClick() {
  console.log(filterParams);
}

const confirmButtonEl = document.querySelector('#confirm-button');
confirmButtonEl.addEventListener('click', onConfirmButtonClick);
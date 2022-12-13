/* =================================================
Main.js deals with the actions that function on global scale,
defines global objects,
and is a coordinator of all different modules

@auther: Jie Li
@date: 12/08/2022
================================================= */

import { initMap, fetchMapBaseData, addBlockGroups } from "./display-map.js";

// Create map
export const map = initMap();

// Init a global object to store map base data
let mapBaseData;

fetchMapBaseData()
.then(resp => {
  mapBaseData = resp;
})

addBlockGroups(map, mapBaseData);

/* ==========
Define some constant objects
used in later sections
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
export const continuousVarsDict = {
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
export const categoricalVarsDict = {
  trip_purpose: {
    displayName: 'Purpose',
    factors: {
      3: 'Work',
      4: 'Eat',
      5: 'Shop',
      7: 'Recreation',
    }
  },
  primary_mode: {
    displayName: 'Mode',
    factors: {
      1: 'Own car',
      3: 'Walk',
      4: 'Bike', 
      5: 'TNC',
      6: 'Transit',
    }
  },
  trip_taker_available_vehicles: {
    displayName: 'Trip takers that have',
    factors: {
      0: '0 car',
      1: '1 car',
      2: '2 cars',
      3: '3+ cars',
    }
  },
  home_work: {
    displayName: 'Trips that',
    factors: {
      startFromHome: 'Starts from home',
      startFromWork: 'Starts from work',
      endAtHome: 'Ends at home',
      endAtWork: 'Ends at work',
    }
  }
}

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
        1: 'Own car',
        3: 'Walk',
        4: 'Bike', 
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

/* =============================
Objects to store display params
================================= */

export const toggleDisplayParams = {
  groupBy: "origin_geoid", // default to departures
  displayType: 'count', // either count, mean, or ratio
  displayVar: null, // if count, then null
  displayFactor: null, // only applies to ratios
}

/* ===========================
Objects to store filter params
============================= */

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
  startFromWork: { filterSQL: 'origin_geoid = work_geoid', isApplied: false },
  startFromHome: { filterSQL: 'origin_geoid = home_geoid', isApplied: false },
  endAtHome: { filterSQL: 'destination_geoid = home_geoid', isApplied: false },
  endAtWork: { filterSQL: 'destination_geoid = work_geoid', isApplied: false },
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
addDisplayVarsEl(toggleDisplayVarsGroupEl, 'count', null, null, `<span class="italic strong">Per capita trip count</span>`);

// 'agg' type
for(const displayVar of mapDisplayVars.meanType) {
  addDisplayVarsEl(
    toggleDisplayVarsGroupEl, 
    'agg', 
    displayVar.varName, 
    null, 
    `<span class="italic strong">Per capita</span> ${displayVar.displayName}`,
  );
}

// 'mean' type
for(const displayVar of mapDisplayVars.meanType) {
  addDisplayVarsEl(
    toggleDisplayVarsGroupEl, 
    'mean', 
    displayVar.varName, 
    null, 
    `<span class="italic strong">Average</span> ${displayVar.displayName}`,
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

    // Change the text on the button
    const buttonEl = document.querySelector('#display-var-button');
    buttonEl.innerHTML = cbEl.nextElementSibling.firstChild.innerHTML;

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

/* ================================================================
For continuous filters, add sliders and Recorders, and Resetters
================================================================== */

import { addSliderFilterEl } from "./add-html.js";
import { addContinuousFilterRecorder, addResetToSliders } from "./filter.js";

// Filter panel element
const filterPanelEl = document.querySelector("#filter-panel");

// Add the slider HTML elements
for(const filterVarName of continuousFilterVars) {
  addSliderFilterEl(
    filterPanelEl,
    filterVarName,
  )
}

// Add recorders
for(const filterVarName of continuousFilterVars) {
  addContinuousFilterRecorder(filterVarName);
}

// Add resetters
addResetToSliders();

/* ==============================================
For categorical filters, add factor selectors, Resetters, and Recorders
Note: Includes home/work related
================================================ */

import { addFilterCbGroupEl, addHomeWorkCbGroupEl } from "./add-html.js";
import { addCategoricalFilterRecorder, addResetToFactorSelectors } from "./filter.js";

for(const varName of ['primary_mode', 'trip_purpose', 'trip_taker_available_vehicles', 'home_work']) {
  addFilterCbGroupEl(filterPanelEl, varName);
}

// Add recorders
for(const varName of ['primary_mode', 'trip_purpose', 'trip_taker_available_vehicles', 'home_work']) {
  addCategoricalFilterRecorder(varName);
}

// Add resetters
addResetToFactorSelectors();

/* ==========
Construct WHERE clause
=========== */

// Takes in current whereclause and append
// Returns where clause (filters) for SQL query
// regarding continuous vars; with ` AND  ` in front
function makeContinuousWhereClause(whereClause, filterParams) {
  // First deal with continuous variables
  for(const key of Object.keys(filterParams.continuousVars)) {
    const filter = filterParams.continuousVars[key];
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.varName} BETWEEN ${filter.lowerBound} AND ${filter.upperBound})`;
      whereClause = whereClause + thisWhere;
    }
  }
  return whereClause;
}

// Takes in current whereclause and append
// Returns where clause (filters) for SQL query
// regarding categorical vars; with `AND  ` in front
function makeCategoricalWhereClause(whereClause, filterParams) {
  // Then deal with categorical variables
  for(const key of Object.keys(filterParams.categoricalVars)) {
    const filter = filterParams.categoricalVars[key];
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.varName} IN (${filter.selectedCategories.join(', ')}))`;
      whereClause += thisWhere;
    }
  }
  return whereClause;
}

// Takes in current whereclause and append
// Returns where clause (filters) for SQL query
// regarding home-work related vars; with `AND  ` in front
function makeHomeWorkWhereClause(whereClause, filterParams) {
  for(const key of Object.keys(filterParams.homeWork)) {
    const filter = filterParams.homeWork[key];
    if(filter.isApplied) {
      const thisWhere = ` AND (${filter.filterSQL})`;
      whereClause += thisWhere;
    }
  }
  return whereClause;
}

function makeWhereClause(filterParams) {
  let whereClause = ``;
  whereClause = makeContinuousWhereClause(whereClause, filterParams);
  whereClause = makeCategoricalWhereClause(whereClause, filterParams);
  whereClause = makeHomeWorkWhereClause(whereClause, filterParams);

  // Return; remove the first " AND "
  if(whereClause === ``) {
    return `WHERE true`;
  } else {
    return `WHERE ${whereClause.substring(5)}`;
  }
}

/* ==========
Construct query to make map
=========== */

// Makes the query to make the map (count type)
function buildQueryForMapCount(toggleDisplayParams, filterParams) {
  const groupByVar = toggleDisplayParams.groupBy;
  const whereClause = makeWhereClause(filterParams);
  const query = `SELECT ${groupByVar} AS geoid, COUNT(*) FROM trips ${whereClause} GROUP BY geoid`;
  return query;
}

// Makes the query to make the map (mean type or agg)
// `operation` is either 'AVG' OR 'SUM'
function buildQueryForMapMeanSum(toggleDisplayParams, filterParams, operation) {
  const groupByVar = toggleDisplayParams.groupBy;
  const displayVar = toggleDisplayParams.displayVar;
  const whereClause = makeWhereClause(filterParams);
  const query = `SELECT ${groupByVar} AS geoid, ${operation}(${displayVar}) FROM trips ${whereClause} GROUP BY geoid`;
  return query;
}

// Makes the query to make the map (ratio type)
function buildQueryForMapRatio(toggleDisplayParams, filterParams) {
  const groupByVar = toggleDisplayParams.groupBy;
  const displayVar = toggleDisplayParams.displayVar;
  const whereClause = makeWhereClause(filterParams);
  const displayFactor = toggleDisplayParams.displayFactor;
  const query = `SELECT ${groupByVar} AS geoid, AVG((${displayVar} = ${displayFactor})::int) * 100 AS ratio FROM trips ${whereClause} GROUP BY geoid`;
  return query;
}

// Makes query to make the map (main)
function buildQueryForMap(toggleDisplayParams, filterParams) {
  if(toggleDisplayParams.displayType === 'count') {
    return buildQueryForMapCount(toggleDisplayParams, filterParams);
  } else if(toggleDisplayParams.displayType === 'mean') {
    return buildQueryForMapMeanSum(toggleDisplayParams, filterParams, 'AVG');
  } else if(toggleDisplayParams.displayType === 'agg') {
    return buildQueryForMapMeanSum(toggleDisplayParams, filterParams, 'SUM');
  } else if(toggleDisplayParams.displayType === 'ratio') {
    return buildQueryForMapRatio(toggleDisplayParams, filterParams);
  }
}

/* ==========
Call API on confirm button click
================ */

import { makeDisplayData } from "./display-map.js";

async function onConfirmButtonClick() {
  const mapQuery = buildQueryForMap(toggleDisplayParams, filterParams);
  console.log(mapQuery);

  // query map
  try {
    const mapResp = await fetch(`https://mobiladelphia.herokuapp.com/test-query/${mapQuery}`);
    const mapData = await mapResp.json();
    const mapUpdateData = mapData.results;
    console.log('map base data ', mapBaseData);
    const mapDisplayData = makeDisplayData(mapBaseData, mapUpdateData);
  } catch(err) {
    console.log(err);  
  }
}

const confirmButtonEl = document.querySelector('#confirm-button');
confirmButtonEl.addEventListener('click', onConfirmButtonClick);

// Click on page load
onConfirmButtonClick();
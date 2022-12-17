/* =================================================
Main.js deals with the actions that function on global scale,
defines global objects,
and is a coordinator of all different modules

@auther: Jie Li
@date: 12/08/2022
================================================= */

import { initMap, fetchMapBaseData, addInitialBlockGroups } from "./display-map.js";

// Create map
export const map = initMap();

// Init a global object to store map base data
let mapBaseData;

fetchMapBaseData()
.then(resp => {
  mapBaseData = resp;
})

addInitialBlockGroups(map, mapBaseData);

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
// Dictionary for categorical filter variables (used to make HTML)
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
|| Update: in Toggle Display section, update map right after clicking
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

    onConfirmButtonClick();

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
    onConfirmButtonClick();
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
Geoselector
=========== */

// Store a global object: geoselection
// Manages currently selected block groups (before pushing them into `filterParams`)
export const geoSelection = {
  selected: [],
  selectedFeatures: [],
}

import { clearAllGeoFilters, clearSelected } from "./display-map.js";

// Reset button || Same as the reset button in the popup
const panelGeoResetButtonEl = document.querySelector('#panel-geo-select-reset');
panelGeoResetButtonEl.addEventListener('click', ( ) => {
  clearAllGeoFilters(map);
  clearSelected(map);
})

// Unapply button: first click on reset button, then click on confirm button
const geoUnapplyButtonEl = document.querySelector('#geo-unapply-button');
geoUnapplyButtonEl.addEventListener('click', ( ) => {
  panelGeoResetButtonEl.click();
  onConfirmButtonClick();
})

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
      let thisWhere;
      if(typeof(filter.selectedCategories[0]) === 'string') {
        thisWhere = ` AND (${filter.varName} IN ('${filter.selectedCategories.join(`', '`)}'))`;
      } else {
        thisWhere = ` AND (${filter.varName} IN (${filter.selectedCategories.join(', ')}))`;
      }
      
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
/**
 * 
 * @param {Object} toggleDisplayParams stored globally
 * @param {Object} filterParams stored globally
 * @returns 
 */
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
Construct query to make dashboard
=========== */

function buildQueryForDashboard(filterParams) {
  const whereClause = makeWhereClause(filterParams);
  return `
    WITH filtered AS (
      SELECT primary_mode, 
          trip_purpose AS purpose, 
          trip_start_time, 
          trip_taker_individual_income AS income, 
          trip_taker_available_vehicles AS car_ownership,
          trip_duration_minutes AS duration,
          trip_distance_miles AS distance
      FROM trips 
      ${whereClause} 
    )(
      SELECT (WIDTH_BUCKET(duration, 0, 60, 6) - 1) * 10 AS cat,
          COUNT(*) AS n_trips,
          'duration' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT (WIDTH_BUCKET(distance, 0, 10, 10) - 1) AS cat,
          COUNT(*) AS n_trips,
          'distance' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT (WIDTH_BUCKET(income, 10000, 160000, 10) - 1) * 15000 + 15000 AS cat,
          COUNT(*) AS n_trips,
          'income' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT car_ownership AS cat,
          COUNT(*) AS n_trips,
          'car_ownership' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT primary_mode AS cat,
          COUNT(*) AS n_trips,
          'primary_mode' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT purpose AS cat,
          COUNT(*) AS n_trips,
          'purpose' AS var
      FROM filtered
      GROUP BY cat
    ) UNION ALL (
      SELECT trip_start_time AS cat,
          COUNT(*) AS n_trips,
          'trip_start_time' AS var
      FROM filtered
      GROUP BY cat
    )
    ORDER BY var
  `
}

/* ==========
Call API on confirm button click
================ */

const dashboardPanel = document.querySelector('#dashboard-panel')

function startDashboarPanelWaitSign() {
  dashboardPanel.innerHTML = 'Please wait while making query';
}

function removeDashboardPanelWeightSign () {
  dashboardPanel.innerHTML = 'Success';
}

// Formats numbers before placing them in the legend
/**
 * 
 * @param {Number} number 
 * @returns {String}
 */
function formatLegendNumber(number, key) {
  if(number >= 1000000) {
    return `${Math.round(number / 1000000)}M`;
  } else if(number >= 1000) {
    return `${Math.round(number / 1000)}K`;
  }
  if(key === 'ratio') {
    return `${Math.round(number)}%`;
  } else {
    return `${Math.round(number)}`;
  }

}

// Updates legend based on aquired quintiles
/**
 * 
 * @param {Array} quintileArr
 * @param {String} key count, avg, sum or ratio
 */
function updateLegendText(quintileArr, key) {
  for(let i = 0; i < quintileArr.length; i++) {
    document.querySelector(`#legend-text-${i + 1}`).innerHTML = formatLegendNumber(quintileArr[i], key);
  }
}

import { makeDisplayData, updateMap } from "./display-map.js";
import { makeDashboard } from "./display-dashboard.js";

async function onConfirmButtonClick() {
  const mapQuery = buildQueryForMap(toggleDisplayParams, filterParams);
  const dashboardQuery = buildQueryForDashboard(filterParams);

  // query map
  try {
    const mapResp = await fetch(`https://mobiladelphia.herokuapp.com/test-query/${mapQuery}`);
    const mapData = await mapResp.json();
    const mapUpdateData = mapData.results;
    const displayInfo = makeDisplayData(mapBaseData, mapUpdateData);

    // Update the map and add all tooltips, popups, and event listeners
    updateMap(
      map, 
      displayInfo.mapData, 
      displayInfo.quintiles, 
      displayInfo.key,
    );
    
    // Update the legend
    updateLegendText(displayInfo.quintiles, displayInfo.key);

  } catch(err) {
    console.log(err);  
  }

  // query for dashboard
  startDashboarPanelWaitSign();
  try {
    const query = `https://mobiladelphia.herokuapp.com/test-query/${dashboardQuery}`;
    let dashboardData;
    if(query.includes('WHERE true')) {
      // Use locally stored
      const path = '../data/dashboard-data-raw';
      const dashboardResp = await fetch(path);
      const dashboardText = await dashboardResp.text();
      dashboardData = Papa.parse(dashboardText, { header: true, skipEmptyLines: true }).data;
    } else {
      const dashboardResp = await fetch(query);
      const dashboardJson = await dashboardResp.json();
      dashboardData = dashboardJson.results;
    }
    removeDashboardPanelWeightSign();
    makeDashboard(dashboardData);
  } catch(err) {
    console.log(err);
  }
}

const confirmButtonEl = document.querySelector('#confirm-button');
confirmButtonEl.addEventListener('click', onConfirmButtonClick);

// Click on page load
onConfirmButtonClick();

export {
  onConfirmButtonClick,
};
/* ========================================
This script has functions regarding making diagrams
using Vega Lite

@author: Jie Li
@date: 12/16/2022
========================================== */

const dashboardVarsDict = {
  distance: {
    displayName: 'Distance',
    type: 'continuous',
    numCat: 10,
    smallerValues: false, // Whether has values smaller than the smallest category
    binWidth: 1,
    floor: 0,
    unit: 'miles',
  },
  duration: {
    displayName: 'Duration',
    type: 'continuous',
    numCat: 10,
    smallerValues: false,
    binWidth: 10,
    floor: 0,
    unit: 'minutes',
  },
  income: {
    displayName: 'Income',
    type: 'continuous',
    numCat: 10,
    smallerValues: true,
    binWidth: 15000,
    floor: 10000,
    unit: 'dollars',
  },
  age: {
    displayName: 'Age',
    type: 'continuous',
    numCat: 10,
    smallerValues: true,
    binWidth: 15000,
    floor: 10000,
    unit: 'dollars',
  }
}

// Finds corresponding category in given array and pushes it to newly initiated array
// If cannot find it, `n_trips` is zero
/**
 * 
 * @param {Array} newArr newly initiated array (half finished)
 * @param {Array} refArr reference array, filtered by unsorted
 * @param {String} catName bin or category name
 * @returns no return
 */
function findMatchAndPush(newArr, refArr, catName) {
  // Loop through refArr
  for(let dataPoint of refArr) {
    if(dataPoint.cat == catName) { // Use two equal signs
      newArr.push(dataPoint);
      return;
    }
  }
  // Cannot find it
  newArr.push({
    cat: catName,
    n_trips: 0,
  })
}

// Extracts and prepares data for a particular variable
/**
 * 
 * @param {Array} allDataArr fetched through API
 * @param {String} varName
 * @param {String} displayName name of variable, e.g., distance, duration
 * @returns {Array}
 */
function prepDataForVega(filtered, varName, displayName) {
  const thisBinWidth = dashboardVarsDict[varName].binWidth;
  // First filter, then do some other modification

  
  // Initiate an empty array
  const result = [];

  // Look for the 0th category if necessary
  if(dashboardVarsDict[varName].smallerValues) {
    findMatchAndPush(result, filtered, '0');
  }

  for(let i = 1; i <= dashboardVarsDict[varName].numCat + 1; i++) {
    findMatchAndPush(result, filtered, i);
  }

  // Change from 'cat' to actual variable name
  // Change category names
  result.map(item => {
    const thisBinFloor = Number(item.cat) * thisBinWidth + dashboardVarsDict[varName].floor;
    if(Number(item.cat) > dashboardVarsDict[varName].numCat) {
      item.cat = `${thisBinFloor}+`;
    } else if(Number(item.cat) === 0) {
      item.cat = `${thisBinFloor - thisBinWidth}-`;
    } else {
      item.cat = `${thisBinFloor}—${thisBinFloor + thisBinWidth}`;
    }
    item[displayName] = item.cat;
    item.Trips = item.n_trips;
  })

  return(result)
}

// Makes object to feed into Vega Lite
function makeVegaObj(preparedData, displayName, xAxisUnit) {
  return {
    "data": {
      "values": preparedData,
    },
    "selection": {
      "highlight": { "type": "single", "empty": "none", "on": "mouseover", "tooltip": true },
      "select": { "type": "multi" }
    },
    "encoding": {
      "x": {
        "field": `${displayName}`, 
        "type": "ordinal", 
        "axis": { 
          "title": `${xAxisUnit}`,
          "labelColor": "#bbbbbb",
          "titleColor": "#353795",
          "grid": false,
        },
        "sort": "none",
      },
      "y": {
        "field": "Trips", 
        "type": "quantitative", 
        "axis": { 
          "title": null, 
          "domainColor": "#cccccc", 
          "labelColor": "#bbbbbb",
          "grid": false,
        },
      },
      "fillOpacity": {
        "condition": {"selection": "select", "value": 1},
        "value": 0.5
      },
      "strokeWidth": {
        "value": 0
      },
      "color": {
        "condition": [
          { "selection": "highlight", "value": "#353795" }
        ],
        "value": "#c8b7d9",
      }
    },
    "mark": {
      "type": "bar",
      "cursor": "pointer",
      "tooltip": true,
    },

    "config": {
      "scale": {
        "bandPaddingInner": 0.1,
      },
      "view": { "stroke": null },
      "axis": {
        "labelFont": "monospace",
        "titleFont": "monospace",
      }
    }
  }
  ;
}

// Estimate mean of binned data
function estimateMean(filtered, varName) {
  const thisBinWidth = dashboardVarsDict[varName].binWidth;
  const thisFloor = dashboardVarsDict[varName].floor;
  let sum = 0;
  let count = 0;
  filtered.forEach(item => {
    const thisCenter = (item.cat - 1) * thisBinWidth + thisBinWidth / 2 + thisFloor;
    const thisWeight = item.n_trips;
    sum = sum + thisCenter * thisWeight;
    count = count + item.n_trips;
  })
  return Math.round(sum * 10 / count) / 10;
}

function makeDashboard(dataArr) {
  const varList = ['distance', 'duration', 'income'];
  for(const varName of varList) {
    // Filter out the data used to make this graph
    const filtered = dataArr.filter(item => {
      return item.var === varName;
    }).map(item => {
      return {
        cat: Number(item.cat),
        n_trips: Number(item.n_trips),
      }
    })
    const estimatedMean = estimateMean(filtered, varName);
    // Update mean figure
    document.querySelector(`#${varName}-mean`).innerHTML = estimatedMean;
    document.querySelector(`#${varName}-unit`).innerHTML = dashboardVarsDict[varName].unit;

    const preparedData = prepDataForVega(
      filtered, 
      varName, 
      dashboardVarsDict[varName].displayName
    );
    console.log(preparedData);
    vegaEmbed(
      `#${varName}-graph`, 
      makeVegaObj(
        preparedData, 
        dashboardVarsDict[varName].displayName, 
        dashboardVarsDict[varName].unit
      )
    );
  }
}

export {
  makeDashboard,
};
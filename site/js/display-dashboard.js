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
    smallerValues: false,
    binWidth: 10,
    floor: 0,
    unit: 'years',
  },
  primary_mode: {
    displayName: 'mode',
    type: 'categorical',
    factors: {
      1: "Own car",
      2: "Carpool",
      3: "Walking",
      4: "Biking",
      5: "TNC",
      6: "Transit",
      7: "Other"
    }
  },
  trip_start_time: {
    displayName: 'departure hour',
    type: 'categorical',
    factors: {
      '0': '0-1',
      '1': '1-2',
      '2': '2-3',
      '3': '3-4',
      '4': '4-5',
      '5': '5-6',
      '6': '6-7',
      '7': '7-8',
      '8': '8-9',
      '9': '9-10',
      '10': '10-11',
      '11': '11-12',
      '12': '12-13',
      '13': '13-14',
      '14': '14-15',
      '15': '15-16',
      '16': '16-17',
      '17': '17-18',
      '18': '18-19',
      '19': '19-20',
      '20': '20-21',
      '21': '21-22',
      '22': '22-23',
      '23': '23-24',
      '24': '24-0',
    },
  },
  purpose: {
    displayName: 'purpose',
    type: 'categorical',
    factors: {
      "1": "Social",
      "2": "School",
      "3": "Work",
      "4": "Eat",
      "5": "Shop",
      "6": "Maintenance",
      "7": "Recreation",
      "8": "Home",
      "9": "Other"
    },
  },
  car_ownership: {
    displayName: 'purpose',
    type: 'categorical',
    factors: {
      "0": "0 car",
      "1": "1 car",
      "2": "2 cars",
      "3": "3+ cars",
      "9": "Unknown",
    },
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
function prepareContinuousVarForVega(filtered, varName, displayName) {
  const thisBinWidth = dashboardVarsDict[varName].binWidth;
  
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
      item.cat = `${thisBinFloor}-`;
    } else {
      item.cat = `${thisBinFloor}—${thisBinFloor + thisBinWidth}`;
    }
    item[displayName] = item.cat;
    item.Trips = item.n_trips;
  })

  return(result)
}

function prepareCategoricalVarForVega(filtered, varName, displayName) {
  // Initiate a result array
  const result = [];
  const keys = Object.keys(dashboardVarsDict[varName].factors);
  for(const key of keys) {
    findMatchAndPush(result, filtered, key)
  }
  result.map(item => {
    item.cat = dashboardVarsDict[varName].factors[item.cat];
    item[displayName] = item.cat;
    item.Trips = item.n_trips;
  })
  return result;
}

// Makes object to feed into Vega Lite
/**
 * 
 * @param {Array} preparedData 
 * @param {String} displayName 
 * @param {String} xAxisUnit unit (miles, etc., to be displayed by the x axis)
 * @returns 
 */
function makeVegaObj(preparedData, displayName, xAxisUnit) {
  return {
    "width": 220,
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
          "labelColor": "#353795",
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
/**
 * 
 * @param {Array} filtered 
 * @param {String} varName `distance` `duration` etc
 * @returns Number
 */
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
  // First make plots for the continuous variables
  const continuousVarsList = ['distance', 'duration', 'income', 'age'];
  for(const varName of continuousVarsList) {
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

    const preparedData = prepareContinuousVarForVega(
      filtered, 
      varName, 
      dashboardVarsDict[varName].displayName
    );
    vegaEmbed(
      `#${varName}-graph`, 
      makeVegaObj(
        preparedData, 
        dashboardVarsDict[varName].displayName, 
        dashboardVarsDict[varName].unit
      )
    );
  }

  // Then make plots for the categorical variables
  const categoricalVarsList = ['primary_mode', 'trip_start_time', 'purpose', 'car_ownership'];
  for(const varName of categoricalVarsList) {
    const filtered = dataArr.filter(item =>  item.var === varName).map(item => {
      return {
        cat: item.cat,
        n_trips: Number(item.n_trips),
      }
    })
    const preparedData = prepareCategoricalVarForVega(
      filtered,
      varName,
      dashboardVarsDict[varName].displayName,
    )
    console.log(preparedData);
    vegaEmbed(
      `#${varName}-graph`,
      makeVegaObj(
        preparedData,
        dashboardVarsDict[varName].displayName,
        '',
      )
    )
  }
}

export {
  makeDashboard,
};
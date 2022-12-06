
//import data and functions
import { initializeMap} from './map.js';

function fetchData() {
  fetch(`./data/311data.csv`)
    .then(resp => resp.text())
    .then(data => {
      const dataset = Papa.parse(data, { header: true });
      
      const cleandata = [];
      //for loop that cleans the dataset
      for (const element of dataset.data){
        if (element['lat'] !== "NA" && element['lat'] !== undefined && element['lat'] !== ''){
          element.parsedInterval = Date.parse(element["interval15"]);
          //make new column called simpleInterval from 0-960 for each interval
         //element.parsedInterval960 = element['simpleInterval']
          cleandata.push(element);
        }
      }
      window.dataset = cleandata;
      //creating a map from parsedInterval to an array of indices (i) in cleandata
      //this needs to map from simpleInterval instead
      const dataDic = {};
      for (let i = 0; i < cleandata.length; i++){
        const cleanElement = cleandata[i];
        if (!dataDic[cleanElement.parsedInterval]){
          dataDic[cleanElement.parsedInterval] = [i];
        } else {
          dataDic[cleanElement.parsedInterval].push(i);
        }
      }
      window.dataDic = dataDic;
    });
}

let map = initializeMap();
fetchData();

/*function onScroll() {
    var counter = document.getElementById("scrollValue");
    counter.innerHTML = document.documentElement.scrollTop;
}*/

let minScroll = 0;
let maxScroll = 100;
let minInt = 0;
let maxInt = 960;
let minMs = 1666843200000;
let maxMs = 1667707200000;
let proportion = (maxMs - minMs)/(maxScroll-minScroll);
let proportion2 = (maxInt - minInt)/(maxScroll-minScroll);

function scrollToDate(scrolled){
  return Math.floor(minMs + (proportion * (scrolled - minScroll)));
}

function scrollToDate2(scrolled){
  return Math.floor(minInt + (proportion2 * (scrolled - minScroll)));
}

function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
    let scrollMs = scrollToDate(scrolled);
    console.log("you have scrolled " + scrolled + '%');
    console.log("The ms you are on is " + scrollMs);
    //if (window.dataDic[scrollSimple]){
    if (window.dataDic[scrollMs]){
      let indicesToAdd = window.dataDic[scrollMs];
      for (const index of indicesToAdd){
        addToMap(window.dataset[index]);
      }
    }
  
  }

  function make311Feature(data){
    return{
      'type': 'Feature',
      'properties': {
      "parsed-interval": Date.parse(data["interval15"]), 
      data
    },
      'geometry': {
        "type": "Point",
        "coordinates": [data["lon"], data["lat"]]
      },
    };
  }

function addToMap(dataToAdd) {
    const dataFeature = make311Feature(dataToAdd);
    //console.log(dataFeature.properties["parsed-interval"]);
    console.log(dataFeature);
    map.dataLayer.addData(dataFeature);
  }
  
  window.onscroll = function () {
    progressBarScroll();
  };



  
  var options = {
    series: [
    {
      name: 'South',
      data: [
        {
          x: "02-10-2017 GMT",
          y: 34
        },
        {
          x: "02-11-2017 GMT",
          y: 43
        },
        {
          x: "02-12-2017 GMT",
          y: 31
        },
        {
          x: "02-13-2017 GMT",
          y: 43
        },
        {
          x: "02-14-2017 GMT",
          y: 33
        },
        {
          x: "02-15-2017 GMT",
          y: 52
        }
      ]
    },
    {
      name: 'North',
      data: [
        {
          x: "02-10-2017 GMT",
          y: 34
        },
        {
          x: "02-11-2017 GMT",
          y: 43
        },
        {
          x: "02-12-2017 GMT",
          y: 31
        },
        {
          x: "02-13-2017 GMT",
          y: 43
        },
        {
          x: "02-14-2017 GMT",
          y: 33
        },
        {
          x: "02-15-2017 GMT",
          y: 52
        }
      ]
    },
    {
      name: 'Central',
      data: [
        {
          x: "02-10-2017 GMT",
          y: 34
        },
        {
          x: "02-11-2017 GMT",
          y: 43
        },
        {
          x: "02-12-2017 GMT",
          y: 31
        },
        {
          x: "02-13-2017 GMT",
          y: 43
        },
        {
          x: "02-14-2017 GMT",
          y: 33
        },
        {
          x: "02-15-2017 GMT",
          y: 52
        }
      ]
    }
  ],
    chart: {
    type: 'area',
    height: 200,
    stacked: true,
    events: {
      selection: function (chart, e) {
        console.log(new Date(e.xaxis.min))
      }
    },
  },
  colors: ['#008FFB', '#00E396', '#CED4DC'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
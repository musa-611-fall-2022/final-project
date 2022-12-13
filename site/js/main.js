
//import data and functions
import { initializeMap} from './map.js';
import {fetchAllData} from './fetch_chart_data.js';



fetchAllData()
.then(() => {


function restructureData(data, cleandata){
  for (let i = 0; i < data.length; i++){
  var x = data[i]["interval60"]
  var y = Number(data[i]["Count"])
  cleandata.push({x,y});
  }
  return cleandata;
}

const cleanComplaintData = [];
const cleanQOLData = [];
const cleanInfoData = [];
const cleanMiscData = [];
const cleanStreetsData = [];

restructureData(window.complaintData.data,cleanComplaintData);
restructureData(window.qolData.data,cleanQOLData);
restructureData(window.infoData.data,cleanInfoData);
restructureData(window.miscData.data,cleanMiscData);
restructureData(window.streetsData.data,cleanStreetsData);

//console.log(cleanComplaintData);


function fetchData() {
  fetch(`./data/data.csv`)
    .then(resp => resp.text())
    .then(data => {
      const dataset = Papa.parse(data, { header: true });
      
      const cleandata = [];
      //for loop that cleans the dataset
      for (const element of dataset.data){
        if (element['lat'] !== "NA" && element['lat'] !== undefined && element['lat'] !== ''){
          //old, uses that neat date parse
          //element.parsedInterval = Date.parse(element["interval15"]);
          element.interval = element['interval']
          cleandata.push(element);
        }
      }
      window.dataset = cleandata;
      //creating a map from parsedInterval to an array of indices (i) in cleandata
      //this needs to map from simpleInterval instead
      const dataDic = {};
      for (let i = 0; i < cleandata.length; i++){
        const cleanElement = cleandata[i];
        if (!dataDic[cleanElement.interval]){
          dataDic[cleanElement.interval] = [i];
        } else {
          dataDic[cleanElement.interval].push(i);
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
let maxInt = 640;
//let minMs = 1666843200000;
//let maxMs = 1667707200000;
//let proportion = (maxMs - minMs)/(maxScroll-minScroll);
let proportion2 = (maxInt - minInt)/(maxScroll-minScroll);

/*function scrollToDate(scrolled){
  return Math.floor(minMs + (proportion * (scrolled - minScroll)));
}*/

function scrollToInt(scrolled){
  return Math.floor(minInt + (proportion2 * (scrolled - minScroll)));
}

function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
    let scrollInt = scrollToInt(scrolled);
    console.log("you have scrolled " + scrolled + '%');
    console.log("The interal you are on is " + scrollInt);
    //if (window.dataDic[scrollSimple]){
    if (window.dataDic[scrollInt]){
      let indicesToAdd = window.dataDic[scrollInt];
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
    if (dataFeature.properties.data["categories"] === "information"){
      map.infoLayer.addData(dataFeature);
    } else if (dataFeature.properties.data["categories"] === "quality of life"){
      map.qolLayer.addData(dataFeature);
    } else if (dataFeature.properties.data["categories"] === "streets"){
      map.streetsLayer.addData(dataFeature);
    } else if (dataFeature.properties.data["categories"] === "complaint"){
      map.complaintLayer.addData(dataFeature);
    } else if (dataFeature.properties.data["categories"] === "miscellaneous"){
      map.miscLayer.addData(dataFeature);   
  }}
  
  window.onscroll = function () {
    progressBarScroll();
  };

  var options = {
    series: [
    {
      name: 'Complaints',
      data: cleanComplaintData
    },
    {
      name: 'Quality of Life',
      data: cleanQOLData
    },
    {
      name: 'Information',
      data: cleanInfoData
    },
    {
      name: 'Streets',
      data: cleanStreetsData
    },
    {
      name: 'Miscellaneous',
      data: cleanMiscData
    }
  ],
    chart: {
    type: 'area',
    height: 200,
    stacked: true,
    toolbar: {
      show: false
    },
    events: {
      selection: function (chart, e) {
        console.log(new Date(e.xaxis.min))
      }
    },
  },
  colors: ['#f94e08', '#11ad7d', '#00c6fc', '#f8f6a7', '#d3a112'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    show: false
  },
  fill: {
    type: 'straight',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    labels: {
      colors: undefined,
      useSeriesColors: true
    },
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis:{
    show: false,
  },
  grid:{
    yaxis: {
      lines: {
          show: false
      }
  }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

});
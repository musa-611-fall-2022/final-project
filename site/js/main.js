
//import data and functions
import { initializeMap} from './map.js';


let map = initializeMap();

/*function onScroll() {
    var counter = document.getElementById("scrollValue");
    counter.innerHTML = document.documentElement.scrollTop;
}*/

function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
    console.log(winScroll);
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
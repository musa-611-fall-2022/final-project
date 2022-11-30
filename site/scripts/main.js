import { readCSV } from "./inventory.js";
import { tooltipEvents } from "./tooltip.js";

const container = document.getElementById("container");

const margin = {top: 0, right: 0, bottom: 0, left: 0};

const width = 720 - margin.left - margin.right;
const height = 540 - margin.top - margin.bottom;

let selectedMap = "Approved Plans";

const tooltip = document.querySelector('#tooltipContainer');
const controlAppr = document.getElementById('approved');
const controlCurrent = document.getElementById("current");

let AYPP = {};

//Adding SVG to play with

const body = d3.select("body");

let svg = body.append("svg")
        .attr ("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg")
      .append("g")
        .attr("transform", "translate(" + margin.left + ',' + margin.top + ")");

function whichData(filterTerm) {
    if (selectedMap == "Current Progress") {
        let data = filterTerm.data.filter(element => element.progress == 1);
        return data;
    } else if (selectedMap == "Approved Plans") { 
        let data = filterTerm.data.filter(element => element);  
        return data;
    };
}

function onInventoryLoadSuccess(data) {
        //Function to load the current progress or the future approved plans of the development
    d3.selectAll(".building-svg").remove();

    //D3 to add paths to the SVG
    console.log(data);
    let pathGroup = svg.append("g")
        .attr("class", "building-svg");

    let buildPaths = pathGroup.selectAll("path")
        .data(whichData(data))
    .join("path")
        .attr("d", d => d.path)
        .attr("stroke", "#000000")
        .attr("stroke-width", "3px")
        .attr("class", "building")
        .call(tooltipEvents, tooltip);

    controlAppr.addEventListener("click", changeFilter);
    controlCurrent.addEventListener("click", changeFilter);
}

readCSV(onInventoryLoadSuccess);

function changeFilter(evt) {
    if (evt.target.id === "approved") {
        selectedMap = "Approved Plans";
        controlAppr.classList.remove("deselected");
        controlAppr.classList.add("selected");
        controlCurrent.classList.add("deselected");
        controlCurrent.classList.remove("selected");
    } else if (evt.target.id === "current") {
        selectedMap = "Current Progress";
        controlCurrent.classList.remove("deselected");
        controlAppr.classList.add("deselected");
        controlCurrent.classList.add("selected");
        controlAppr.classList.remove("selected");
    }
    readCSV(onInventoryLoadSuccess);
}

window.width = width;
window.height = height;
window.margin = margin;
window.tooltip = tooltip;






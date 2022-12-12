import { readCSV } from "./inventory.js";
import { tooltipEvents } from "./tooltip.js";
import { loadBar } from "./bar.js";

const container = document.getElementById("container");

const margin = {top: 0, right: 0, bottom: 0, left: 0};
const tooltipMargin = {top: 12, right: 12, bottom: 12, left: 12};

const width = 720 - margin.left - margin.right;
const height = 540 - margin.top - margin.bottom;
const tooltipWidth = 220 - tooltipMargin.left - tooltipMargin.right;

let selectedMap = "Approved Plans";

const tooltip = document.querySelector('#tooltipContainer');
const controlAppr = document.getElementById('approved');
const controlCurrent = document.getElementById("current");

let AYPP = {};
const unitTypes = ["low-income", "moderate-income",	"middle-income", "market", "condo"];
const colors = ["#5CB867", "#159524", "#065F11", "#DC4230", "#99221A"];

//Adding SVG to play with

const body = d3.select("body");

let svg = body.append("svg")
        .attr ("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg")
        .attr("class", "background")
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

function loadPaths(data){
    d3.selectAll(".building-svg").remove();

    //D3 to add paths to the SVG
    //here's the group
    let pathGroup = svg.append("g")
        .attr("class", "building-svg");
    
    //here's the append
    let buildPaths = pathGroup.selectAll("path")
        .data(whichData(data))
    .join("path")
        .attr("d", d => d.path)
        .attr("stroke", "#000000")
        .attr("stroke-width", "3px")
        .attr("class", "building")
        .call(tooltipEvents)
        
    // //stacked 
    // const stackGen = d3.stack()
    //     .keys(unitTypes);

    // let stackedSeries = stackGen(data)
    
    // //scale bar proportion to the width of the tooltip
    // let xScale = d3.scaleLinear()
    // .domain([0, d3.max(data, d => d.Units)])
    // .range([0, 100]);

    // //colors to match the unit affordability designations
    // let colorScale = d3.scaleOrdinal()
    //     .domain(["low-income", "moderate-income",	"middle-income", "market", "condo"])
    //     .range(["#065F11", "#159524", "#5CB867", "#DC4230", "#99221A"]);
 
    // let x = bbox.x;
    // let y = bbox.y;
}

function getUnitTotals(data) {
    let totals = {totalUnits: 0};
    console.log(data);
    for (let u of unitTypes) {
        Object.defineProperty(totals, u, {  
            value: 0,
            writable: true});
    }

    for (let r of data.data) {
        for (let u of unitTypes) {
            if (parseInt(r[u]) == 0 || (parseInt(r[u]))) {
                let y = parseInt(r[u]);        
                totals[u] += y;
                totals.totalUnits += y;
            }
        }
    }

    Object.defineProperty(totals, "remaining", {    
        value: 6430-totals.totalUnits,
        writable: true});

    console.log(totals);
    return totals
}

function onInventoryLoadSuccess(data) {
    //Function to load the current progress or the future approved plans of the development
    console.log(data);
    loadPaths(data);
    getUnitTotals(data);
    //loadBar(data);
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
window.tooltipWidth = tooltipWidth;
window.unitTypes = unitTypes;
window.colors = colors;






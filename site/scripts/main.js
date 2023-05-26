import { readCSV } from "./inventory.js";
import { loadBar } from "./bar.js";
import { loadPathsLoop } from "./buildings.js";

const margin = { top: 0, right: 30, bottom: 50, left: 30 };
const tooltipMargin = { top: 12, right: 12, bottom: 12, left: 12 };

const width = 720 - margin.left - margin.right;
const height = 540 - margin.top - margin.bottom;
const tooltipWidth = 220 - tooltipMargin.left - tooltipMargin.right;

let selectedMap = "Approved Plans";

const tooltip = document.querySelector('#tooltipContainer');
const controlAppr = document.getElementById('approved');
const controlCurrent = document.getElementById("current");

const unitTypes = ["low_income", "moderate_income", "middle_income", "remaining_affordable", "market", "condo", "remaining_market"];
const colors = ["#065F11", "#159524", "#5CB867", "#B6DEBC", "#DC4230", "#99221A", "#DC4230"];


//Adding SVG to play with

// eslint-disable-next-line no-undef
const body = d3.select("body");

let svg = body.append("svg")
        .attr ("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg")
        .attr("class", "background")
        .style('pointer-events', 'all')
      .append("g");

// filter based on
function whichData(filterTerm) {
    if (selectedMap == "Current Progress") {
        let d = filterTerm.filter(element => element.progress == 1);
        return d;
    } else if (selectedMap == "Approved Plans") {
        let d = filterTerm.filter(element => element);
        return d;
    }
}

//getting totals for the bottom bar text labels, which summarize in a broader category than individual units used for each building

function getUnitTotals(data) {
    let totals = { totalUnits: 0 };
    for (let u of unitTypes) {
        Object.defineProperty(totals, u, {
            value: 0,
            writable: true });
    }

    for (let r of data) {
        for (let u of unitTypes) {
            if (parseInt(r[u]) == 0 || (parseInt(r[u]))) {
                let y = parseInt(r[u]);
                totals[u] += y;
                totals.totalUnits += y;
            }
        }
    }

    if (selectedMap == "Approved Plans"){
    Object.defineProperty(totals, "remaining_affordable", {
        value: 2250 - totals.low_income - totals.middle_income - totals.moderate_income,
        writable: true });
    Object.defineProperty(totals, "remaining_market", {
        value: 4180 - totals.market - totals.condo,
        writable: true });
    }

    return totals;
}

function onInventoryLoadSuccess(data) {
    //Function to load the current progress or the future approved plans of the development
    console.log(data);
    loadPathsLoop(whichData(data), svg, selectedMap);
    loadBar(getUnitTotals(whichData(data)), selectedMap);
}

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

controlAppr.addEventListener("click", changeFilter);
controlCurrent.addEventListener("click", changeFilter);

readCSV(onInventoryLoadSuccess);

export {
    tooltipWidth,
    margin,
    width,
    height,
    unitTypes,
};

window.width = width;
window.height = height;
window.margin = margin;
window.tooltip = tooltip;
window.tooltipWidth = tooltipWidth;
window.colors = colors;
window.selectedMap = selectedMap;






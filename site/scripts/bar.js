/* eslint-disable no-undef */

import { margin, unitTypes, width, height } from "./main.js";
import { handleBarMouseover, handleBarMouseleave } from "./keyTooltips.js";

//colors to match the unit affordability designations
let colorScale = d3.scaleOrdinal()
    .domain(["low_income", "moderate_income", "middle_income", "remaining_affordable", "market", "condo", "remaining_market"])
    .range(["#065F11", "#5CB867", "#F2DC12", "#D6DDAA", "#EA5240", "#99221A", "#E3BDBD"]);

function loadBar(data, selectedMap){

    const barHeight = 30;
    const dataA = [data]; //need an array to be able to iterate via d3.stack()

    d3.select("#barGroup").remove();

    //add the g for the proportion bar group to the base svg
    const bar = d3.select("svg").append('g')
        .attr("id", "barGroup")
        .attr("class", "bar-group")
        .style("pointer-events", "all");

    //create the keys for the bar stack
    let stackGen = d3.stack()
        .keys(unitTypes);

    let stackedSeries = stackGen(dataA);

    let domainEnd = function () {
        if (selectedMap == "Current Progress") {
            return data.totalUnits;
        } else if (selectedMap == "Approved Plans") {
            return data.totalUnits + data.remaining_affordable + data.remaining_market;
        }
    };

    //scale bar proportion to the width of the tooltip
    let xScale = d3.scaleLinear()
        .domain([0, domainEnd()])
        .range([0, width]);

    bar.selectAll("rect")
            .data(stackedSeries).join("rect")
        .attr("y", height - barHeight)
        .attr("x", d => (xScale(d[0][0]) + margin.left))
        .attr('height', barHeight)
        .attr("width", d => {return d.key == "middle_income" || d.key == "remaining_affordable" || d.key == "condo" ? ((xScale(d[0][1]) - xScale(d[0][0])) - 5) : ((xScale(d[0][1]) - xScale(d[0][0])))})
        .attr("fill", d => colorScale(d.key))
        .attr("id", d => {console.log(d); 
            return d.key;})
        .on("mouseover", function (d) {
            handleBarMouseover(d);})
        .on("mouseout", function (d) {
            handleBarMouseleave(d);})

            
    //create the keys and stack for the bar labels, so they can be placed accurately below the bar chart
    const macroTypes = ["affordable", "market"];

    const stackGenLabels = d3.stack()
    .keys(macroTypes);

    function getTotalsAM(data) {
        let totalsAM = { affordable: data.low_income + data.middle_income + data.moderate_income + data.remaining_affordable,
                        market: data.market + data.condo + data.remaining_market,
        };
        let totalsAMArray = [totalsAM];
        return totalsAMArray;
    }

    const stackedSeriesLabels = stackGenLabels(getTotalsAM(data));

    //Create the LABELS
    bar.selectAll("text")
    .data(stackedSeriesLabels).join("text")
    .attr("y", height + 15)
    .attr("x", d => xScale(d[0][0]) + margin.left)
    .text(d => `${d[0][1] - d[0][0]} ${d.key == "affordable" ? "Affordable" : "Market-Rate" } Units 
        ${(selectedMap == "Approved Plans" ? (
            d.key == "affordable" ? ", " + data.remaining_affordable + " Unconfirmed" :
            d.key == "market" ? ", " + data.remaining_market + " Unconfirmed" :
            "") :
        "" )}`)
    .attr("class", "bar-label");

    //title for the bottom bar
    bar.append("text")
    .text("Total Units")
    .attr("class", "box-header")
    .attr("x", margin.left)
    .attr("y", height - barHeight - 5);

    //Labels for the remaining units

    //Tooltips for each 
}


export {
    loadBar,
    colorScale,
};



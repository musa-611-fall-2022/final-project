import { colorScale } from "./bar.js";

const barGroup = d3.select("#barGroup");

//placing the tooltip above the bar
function showBarTooltip(selection) {
    const MOUSE_POS_OFFSET = 10;
    const toolTipWidth = 220;
  
    let bbox = selection.target.getBBox();
    let x = bbox.x;
    let y = bbox.y;
  
    d3.select("#tooltipBarContainer")
        .style("display", "block")
        .style("top", 
            selection.target.__data__.key.includes("remaining") ? y - 116 + "px" 
            : y - 72 +"px")
        .style("left",
             x < (width + margin.left - toolTipWidth) ? x + "px"
            : (x + bbox.width - toolTipWidth) + "px");
}
  
function setBarContents(selection) {
    let tooltip = d3.select("#tooltipBarContainer");
    let unitType = selection.target.__data__.key.replace(/_/g, " ");
    let unitColor = colorScale(selection.target.__data__.key);

    //change the label text depending on the unit type
    tooltip.selectAll("#label")
        .data(selection.target.__data__)
    .join("p")
        .text(`Total ${unitType} units:`)
        .attr("id", "label")
        .classed("units-tooltip-label", true);

    //change the count text for the unit counts
    tooltip.selectAll("#count")
        .data(selection.target.__data__)
    .join("p")
        .text(d => `${d[1] - d[0]} Units`)
        .attr("id", "count")
        .classed("units-tooltip-count", true)
    .append("span")
        .style("background-color", unitColor)
        .style("color", unitColor)
        .text("__")
        .classed("row-color");

    //change the caption text for the remaining units
    if (unitType.includes("remaining")) {
            tooltip.selectAll("#caption")
            .data(selection.target.__data__)
        .join("p")
            .text(`Units have not been allocated to buildings yet.`)
            .attr("id", "caption")
            .classed("units-tooltip-label", true);
    }
}

//tooltip mouseout functions
function hideBarTooltip() {
    d3.select("#tooltipBarContainer").style("display", "none");
  }
  
function removeBarTooltipContents() {
    d3.select("#count").remove();
    d3.select("#label").remove();
    d3.select("#caption").remove();
}

function setBarStyle(selection) {
    console.log(selection);
    d3.select(selection.target)
        .attr("stroke", "black")
      .attr("stroke-width", "3px")
      .raise();
  }
  
  function resetBarStyle(selection) {
    d3.select(selection.target)
      .attr("stroke-width", "0px")
  }

function handleBarMouseover(d) {
    showBarTooltip(d);
    setBarContents(d);
    setBarStyle(d);
}
  
function handleBarMouseleave(d) {
    hideBarTooltip();
    removeBarTooltipContents();
    resetBarStyle(d);
}

export {
    handleBarMouseleave,
    handleBarMouseover
}
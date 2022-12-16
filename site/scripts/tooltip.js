import { margin, tooltipWidth, width } from "./main.js";

//placing the tooltip near the building, on the correct side
function showTooltip(selection) {
  const MOUSE_POS_OFFSET = 10;
  const toolTipWidth = 220;

  let bbox = selection.node().getBBox();
  let x = bbox.x;
  let y = bbox.y;

  d3.select("#tooltipContainer")
      .style("display", "block")
      .style("top", y +"px")
      .style("left",
           x < (width + margin.left + margin.right) / 2 ? (x + bbox.width + MOUSE_POS_OFFSET) + "px"
          : (x - toolTipWidth - MOUSE_POS_OFFSET) + "px");
}

function setContents(selection) {
  d3.selectAll(".tooltip-header") //Address or B#
      .data(selection)
      .join("h3")
        .text(d => d.address) 
    .selectAll(".year") //Year of Completion
        .data(selection)
        .join("div")
        .text(d => d.date)
        .classed("year");

    if (selection[0].Units != "N/A") {

      //add the svg for the proportion bar
      const miniBar = d3.select("#tooltipContent").append('svg')
        .attr("class", "bar");

      //generate and call stack function, returns array of stacked data in number series
      const stackGen = d3.stack()
        .keys(["low_income", "moderate_income",	"middle_income", "market", "condo"]);

      let stackedSeries = stackGen(selection);

      //scale bar proportion to the width of the tooltip
      let xScale = d3.scaleLinear()
        .domain([0, d3.max(selection, d => {if (parseInt(d)) {
            return d.Units;
          } else {return 0}})])
        .range([0, tooltipWidth]);

      //colors to match the unit affordability designations
      let colorScale = d3.scaleOrdinal()
        .domain(["low_income", "moderate_income",	"middle_income", "market", "condo", "remaining"])
        .range(["#065F11", "#159524", "#5CB867", "#DC4230", "#99221A", "#CCCCCC"]);

      //add the stacked bar
      miniBar.selectAll("rect")
            .data(stackedSeries)
          .join("rect")
            .attr("x", d => xScale(d[0][0]))
            .attr("y", 0)
            .attr("width", d => (xScale(d[0][1]) - xScale(d[0][0])))
            .attr("height", 10)
            .attr("fill", d => colorScale(d.key));

      //remove the bar if there is nothing in it
      if (selection[0].Units == "Unconfirmed"){
        miniBar.remove();
      }

      //Table content
      const unitTable = d3.select("#tooltipContent")
        .append("table")
          .attr("class", "tooltip-table")
          .attr("id", "unitTable")
          .style("width", tooltipWidth);

      unitTable.selectAll(".table-header")
          .data(selection)
        .join("tr")
          .append("th")
            .attr("scope", "col")
            .attr("colspan", "2")
            .text(d => `${d.Units} Units`)
            .attr("class", "table-header");

      unitTable.append("col")
        .style("width", "90%");

      unitTable.append("col")
        .style("width", "10%");

      //adding the details in the unit table
      for (let z of stackedSeries) {
        let unitCount = z[0][1] - z[0][0];
        if (unitCount > 0) {

        let unitType = z.key;
        let unitColor = colorScale(z.key);

        let unitRow = unitTable.append("tr");

        unitRow.selectAll("td")
          .data(z).join("td")
            .text(`${unitCount} ${unitType}`);

        //row color
        unitRow.append("td")
          .style("background-color", unitColor)
          .style("color", unitColor)
          .text("__")
          .classed("row-color");

        }
      }

    }

    //Adding notes at the end
    if (selection[0].other != "N/A"){
      const otherTable = d3.select("#tooltipContent")
        .append("table")
          .attr("class", "tooltip-table")
          .attr("id", "unitTable")
          .style("width", tooltipWidth);

      otherTable.selectAll(".table-header")
          .data(selection)
        .join("tr")
          .append("th")
            .attr("scope", "col")
            .attr("colspan", "2")
            .text(`Other`)
            .attr("class", "table-header");

      let otherRow = otherTable.append("tr");

      otherRow.selectAll("td")
          .data(selection).join("td")
            .text(selection[0].other)
            .classed("box-body");
    }

}

//tooltip mouseout functions
function hideTooltip() {
  d3.select("#tooltipContainer").style("display", "none");
}

function removeContents() {
d3.selectAll(".bar").remove();
d3.selectAll("#unitTable").remove();
}

function setBStyle(selection) {
  d3.selectAll(".building")
    .classed("not-selected", true);
  d3.select(selection)
    .classed("not-selected", false)
    .classed("selected", true)
    .attr("stroke-width", "6px");
}

function resetBStyle(selection) {
  d3.selectAll(".building")
    .classed("not-selected", false);
  d3.select(selection)
    .classed("selected", false)
    .attr("stroke-width", "3px");
}

function handleMouseover() {
    showTooltip(d3.select(this));
    setContents(d3.select(this).data());
    setBStyle(this);
}

function handleMouseleave() {
    hideTooltip();
    removeContents();
    resetBStyle(this);
}

function tooltipEvents(selectionGroup) {
    selectionGroup.each(function () {
        d3.select(this)
          .on("mouseover", handleMouseover)
          .on("mouseleave", handleMouseleave);
      });
}

export {
    tooltipEvents,
};
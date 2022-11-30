function tooltipEvents(selectionGroup, tooltip) {
    selectionGroup.each(function () {
        d3.select(this)
          .on("mouseover", handleMouseover)
          .on("mouseleave", handleMouseleave);
      });
}

function handleMouseover() {
    showTooltip(d3.select(this));
    setContents(d3.select(this).data());
    setBStyle(this);
}

function handleMouseleave() {
    hideTooltip();
    resetBStyle(this);
}

function setContents(selection) {
    // customize this function to set the tooltip's contents however you see fit
    d3.select("#tooltipContainer")
      .selectAll("p")
      .data(selection)
      .join("p")
        .text(d => d.id);
      /*.filter(=> value !== null && value !== undefined)
      .html(d =>
          `<strong>${d.id}</strong>`
        );*/
}

function showTooltip(selection) {
    const MOUSE_POS_OFFSET = 8;
    const toolTipWidth = 200;

    let bbox = selection.node().getBBox();
    let x = bbox.x;
    let y = bbox.y;

    d3.select("#tooltipContainer")
        .style("display", "block")
        .style("top", y+"px")
        .style("left", 
             x < (width + margin.left + margin.right) / 2 ? (x + bbox.width + MOUSE_POS_OFFSET) + "px"
            : (x - toolTipWidth - MOUSE_POS_OFFSET) + "px");
  }

function hideTooltip() {
    d3.select("#tooltipContainer").style("display", "none");
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

export {
    tooltipEvents,
};
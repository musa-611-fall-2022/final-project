/* eslint-disable no-undef */
import { tooltipEvents } from "./tooltip.js";

//setting B# and Hammer icon positions
function setLabelPos(b, outline, XY, m){
    if (b != "N/A"){
        let txtMargin = parseInt(m);
        if (b == "TL") {
            return (
                XY == "x" ?  outline.getBBox().x - txtMargin :
                XY == "y" ?  outline.getBBox().y - txtMargin :
                0
            );
        } else if (b == "TR") {
            return (
                XY == "x" ?  outline.getBBox().x + outline.getBBox().width + txtMargin :
                XY == "y" ?  outline.getBBox().y - txtMargin :
                0
            );
        } else if (b == "BL") {
            return (
                XY == "x" ?  outline.getBBox().x - txtMargin :
                XY == "y" ?  outline.getBBox().y + outline.getBBox().height + txtMargin :
                0
            );
        } else if (b == "BR") {
            return (
                XY == "x" ?  outline.getBBox().x + outline.getBBox().width + txtMargin :
                XY == "y" ?  outline.getBBox().y + outline.getBBox().height + txtMargin :
                0
            );
        }
    }
}

//function for adding buildings
function loadPathsLoop(data, svg, selectedMap){
    d3.selectAll(".building-svg").remove();
    d3.selectAll("defs").remove();

    //D3 to add paths to the SVG
    let defs = svg.append("defs");

    //putting masks in the <defs> to be referenced later
    defs.selectAll("clipPath")
            .data(data)
        .join("clipPath")
            .attr("id", d => `${d.id}-clip`)
        .append("path")
            .attr("d", d => d.path);

    //creating the unconfirmed gradient with SVG linearGradient
    let gradient = defs.append("linearGradient")
            .attr("id", "unconfirmedGradient");

    gradient.append("stop")
    .attr("offset", "25%")
    .attr("stop-color", "#D6DDAA");
    
    gradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#E3BDBD");
 
    //here's the group
    let pathGroup = svg.append("g")
    .attr("class", "building-svg");

    //every unit element
    const stackGenB = d3.stack()
    .keys(["low_income", "moderate_income", "middle_income", "market", "condo"]);

    //colors for everything
    let colorScaleB = d3.scaleOrdinal()
    .domain(["low_income", "moderate_income", "middle_income", "market", "condo", "unconfirmed", "other"])
    .range(["#065F11", "#5CB867", "#F2DC12", "#EA5240", "#99221A", "url(#unconfirmedGradient)", "#483C35"]);

    //Looping through every item instead of doing all data joins at once for the sake of ordering buildings correctly
    for (let build of data) {
        let building = [build];

        if (parseInt(build.Units)){ //UNIT BUILDINGS

            let stackedSeriesB = stackGenB(building);
            let buildGroup = pathGroup.append("g")
                .attr("class", "building-group");

            //create the outline of the buildings
            buildGroup.selectAll(`${build.id}-building`)
                .data(building)
            .join("path")
                .attr("d", d => d.path)
                .attr("stroke", d => {
                    return (d.construction == 0 ? "#000000" : "#ffffff")} ) //change outline if under construction
                .attr("stroke-width", "3px")
                .attr("class", `building`)
                .attr("id", `${build.id}-path`)
                .call(tooltipEvents); //add tooltip events

            //select the outline for dynamic sizing of other elements
            const outline = document.querySelector(`#${build.id}-path`);

            //scale for graphs
            let xScaleB = d3.scaleLinear()
            .domain([0, build.Units])
            .range([0, outline.getBBox().width]);

            //add the horizontal graphs as fills, scaled to the width of the building
            buildGroup.selectAll("rect")
                .data(stackedSeriesB)
              .join("rect")
                .attr("x", d => xScaleB(d[0][0]) + outline.getBBox().x)
                .attr("y", outline.getBBox().y)
                .attr("width", d => (xScaleB(d[0][1]) - xScaleB(d[0][0])))
                .attr("height", outline.getBBox().height)
                .attr("fill", d => colorScaleB(d.key))
                .attr("stroke", d => colorScaleB(d.key))
                .attr("clip-path", `url(#${build.id}-clip)`);

            //add detail lines to buildings
            buildGroup.selectAll(`${build.id}-detail`)
                .data(building)
            .join("path")
                .attr("d", d => d.edges)
                .attr("stroke", "white")
                .attr("stroke-width", "0.5px")
                .attr("class", `detail`)
                .attr("id", `${build.id}-detail`);

            //move the path above the fill
            d3.select(outline).raise();

            //Add building labels
            buildGroup.selectAll("text")
                .data(building)
            .join("text")
                .text(d => d.id.toUpperCase())
                .attr("x", d => setLabelPos(d.labelPos, outline, "x", d.labelMar))
                .attr("y", d => setLabelPos(d.labelPos, outline, "y", d.labelMar))
                .attr("class", "b-label");
            /*           
            //add hammer to show construction
            if (build.construction == "1" && selectedMap == "Current Progress") {
                buildGroup.append("image")
                .attr("href", "./images/Assets_720x540/Hammer.svg")
                .attr("width", 25)
                .attr("height", 25)
                .attr("x", setLabelPos("TL", outline, "x", 25))
                .attr("y", setLabelPos("TL", outline, "y", 10));
            }*/

        } else if (build.Units === "N/A" || build.Units === "Unconfirmed"){ // UNCONFIRMED & OTHER BUILDINGS

            //put each building in its own group
            let buildGroup = pathGroup.append("g")
            .attr("class", "building-group");

            //set the outline path
            buildGroup.selectAll("building")
                .data(building)
            .join("path")
                .attr("d", d => d.path)
                .attr("stroke", d => {
                    return (d.construction == 0 ? "#000000" : "#ffffff")} ) //change outline if under construction
                .attr("stroke-width", "3px")
                .attr("class", "building")
                .attr("id", `${build.id}-path`)
                .call(tooltipEvents);

            //id the outline to inform widths and heights
            const outline = document.querySelector(`#${build.id}-path`);

            //separate what color to use for fill
            let key = "";
            if (build.Units === "Unconfirmed") {
                key = "unconfirmed";
            } else {
                key = "other";
            }

            //add the standard fill to the building. Different function than the above bc no stacked series.
            buildGroup.append("rect")
                .attr("x", outline.getBBox().x)
                .attr("y", outline.getBBox().y)
                .attr("width", outline.getBBox().width)
                .attr("height", outline.getBBox().height)
                .attr("fill", colorScaleB(key))
                .attr("id", `${build.id}-fill`)
                .attr("clip-path", `url(#${build.id}-clip)`);

            //add detail lines to the building
            buildGroup.selectAll(`${build.id}-detail`)
                .data(building)
            .join("path")
                .attr("d", d => d.edges)
                .attr("stroke", "white")
                .attr("stroke-width", "0.5px")
                .attr("class", `detail`)
                .attr("id", `${build.id}-detail`);

            //move the path above the fill
            d3.select(outline).raise();

            //add building labels
            buildGroup.selectAll("text")
                .data(building)
            .join("text")
                .text(d => d.id.toUpperCase())
                .attr("x", d => setLabelPos(d.labelPos, outline, "x", d.labelMar))
                .attr("y", d => setLabelPos(d.labelPos, outline, "y", d.labelMar))
                .attr("class", "b-label");
            /*
            //add hammer if under construction
            if (build.construction == "1" && selectedMap == "Current Progress") {
                buildGroup.append("image")
                .attr("href", "./images/Assets_720x540/Hammer.svg")
                .attr("width", 25)
                .attr("height", 25)
                .attr("x", setLabelPos("TL", outline, "x", 0))
                .attr("y", setLabelPos("TL", outline, "y", 0));
            }*/

        }
    }
}

export {
    loadPathsLoop,
};
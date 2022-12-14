import { tooltipEvents } from "./tooltip.js";

function loadPathsLoop(data, svg, selectedMap){
    d3.selectAll(".building-svg").remove();
    d3.selectAll("defs").remove();

    //D3 to add paths to the SVG    
    let defs = svg.append("defs");

    //masks
    let buildMasks = defs.selectAll("clipPath")
        .data(data)
    .join("clipPath")
        .attr("id", d => `${d.id}-clip`)
    .append("path")
        .attr("d", d => d.path);

    let gradient = defs.append("linearGradient")
            .attr("id", "unconfirmedGradient");
    
    gradient.append("stop")
    .attr("offset", "25%")
    .attr("stop-color", "#B6DEBC")

    gradient.append("stop")
    .attr("offset", "95%")
    .attr("stop-color", "#EDABA3")

    //     <linearGradient id="myGradient" gradientTransform="rotate(90)">
    //     <stop offset="5%" stop-color="gold" />
    //     <stop offset="95%" stop-color="red" />
    //   </linearGradient>

    //here's the group
    let pathGroup = svg.append("g")
    .attr("class", "building-svg");

    const stackGenB = d3.stack()
    .keys(["low_income", "moderate_income", "middle_income", "market", "condo"]);

    let colorScaleB = d3.scaleOrdinal()
    .domain(["low_income", "moderate_income", "middle_income", "market", "condo", "unconfirmed", "other"])
    .range(["#065F11", "#159524", "#5CB867", "#DC4230", "#99221A", "url(#unconfirmedGradient)", "#395054"]);

    for (let build of data) {
        let building = [build];
        console.log(build);
        if (parseInt(build.Units)){ //UNIT BUILDINGS
            console.log("units");

            let stackedSeriesB = stackGenB(building);
            let buildGroup = pathGroup.append("g")
                .attr("class", "building-group");
            
            buildGroup.selectAll(`${build.id}-building`)
                .data(building)
            .join("path")
                .attr("d", d => d.path)
                .attr("stroke", "#000000")
                .attr("stroke-width", "3px")
                .attr("class", `building`)
                .attr("id",`${build.id}-path`)
                .call(tooltipEvents)

            const outline = document.querySelector(`#${build.id}-path`);

            let xScaleB = d3.scaleLinear()
            .domain([0, build.Units])
            .range([0, outline.getBBox().width]); //replace width with dynamic figure later 

            buildGroup.selectAll("rect")
                .data(stackedSeriesB)
              .join("rect")
                .attr("x", d => xScaleB(d[0][0]) + outline.getBBox().x)
                .attr("y", outline.getBBox().y)
                .attr("width", d => (xScaleB(d[0][1]) - xScaleB(d[0][0])))
                .attr("height", outline.getBBox().height)
                .attr("fill", d => colorScaleB(d.key))
                .attr("stroke", d => colorScaleB(d.key))
                .attr("clip-path", `url(#${build.id}-clip)`);;
            
            //move the path above the fill
            d3.select(outline).raise();

        } else if (build.Units === "N/A" || build.Units === "Unconfirmed"){ // OTHER BUILDINGS

            let buildGroup = pathGroup.append("g")
            .attr("class", "building-group");

            //set the path
            let buildPaths = buildGroup.selectAll("building")
                .data(building)
            .join("path")
                .attr("d", d => d.path)
                .attr("stroke", "#000000")
                .attr("stroke-width", "3px")
                .attr("class", "building")
                .attr("id", `${build.id}-path`)
                .call(tooltipEvents);
            
            const outline = document.querySelector(`#${build.id}-path`);

            //set the fill with the clippath over a rectangle, set to the wdith and height of the path

            let key = ""

            if (build.Units === "Unconfirmed") {
                key = "unconfirmed";
            } else {
                key = "other"
            }

            let fill = buildGroup.append("rect")
                .attr("x", outline.getBBox().x)
                .attr("y", outline.getBBox().y)
                .attr("width", outline.getBBox().width)
                .attr("height", outline.getBBox().height)
                .attr("fill", colorScaleB(key))
                .attr("id",`${build.id}-fill`)
                .attr("clip-path", `url(#${build.id}-clip)`);
               
            //move the path above the fill
            d3.select(outline).raise();
        }
    }
    
}

export {
    loadPathsLoop, 
}
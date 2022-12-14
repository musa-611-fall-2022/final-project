function loadPaths(data, svg){
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

    //here's the group
    let pathGroup = svg.append("g")
    .attr("class", "building-svg");

    let buildPaths = pathGroup.selectAll("building")
        .data(data)
    .join("path")
        .attr("d", d => d.path)
        .attr("stroke", "#000000")
        .attr("stroke-width", "3px")
        .attr("class", "building")
        .call(tooltipEvents)
        .attr("id", d => `${d.id}-path`)

    //define the graphs
        //generate and call stack function, returns array of stacked data in number series
        
        const stackGenB = d3.stack()
            .keys(["low_income", "moderate_income", "middle_income", "market", "condo"]);

        const dataConfirmed = filterConfirmedUnits(data);

        let stackedSeriesB = stackGenB(dataConfirmed);

        console.log(stackedSeriesB);

        //scale bar proportion to the width of the tooltip
        let xScaleB = d3.scaleLinear()
            .domain([0, d3.max(dataConfirmed, d => d.Units)])
            .range([0, 100]); //replace width with dynamic figure later
        
        //colors to match the unit affordability designations
        let colorScaleB = d3.scaleOrdinal()
            .domain(["low-income", "moderate-income", "middle-income", "market", "condo", "unconfirmed", "other"])
            .range(["#065F11", "#159524", "#5CB867", "#DC4230", "#99221A", "#CCCCCC", "#395054"]);
        
        let fillGraphs = pathGroup.selectAll("g.series")
            .data(stackedSeriesB).join("g")
                .attr("id", d => `${d.key}-fill`)
                .classed("series", true)
                .style('fill', d => colorScaleB(d.key));

        //add the stacked bar
        fillGraphs.selectAll("rect")
                .data(d => d)
            .join("rect")
                .attr("x", d => parseInt(d.data.left) + xScaleB(d[0]))
                .attr("y", d => parseInt(d.data.top))
                .attr("width", d => xScaleB(d[1] - d[0]))
                .attr("height", 100)
                .attr("id", d => `${d.data.id}-fill-${d.key}`)
                .attr("clip-path", d => `url(#${d.data.id}-clip)`)
      //          .call(orderFront(`${d.data.id}-path`));


}
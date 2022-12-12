function loadBar(data){

    //add the g for the proportion bar group to the base svg
    const bar = d3.select("svg").append('g')
        .attr("class", "bar-group")

    //create the keys for the bar stack
    const stackGen = d3.stack()
        .keys(unitTypes);

    let stackedSeries = stackGen(data)

    //scale bar proportion to the width of the tooltip
    let xScale = d3.scaleLinear()
        .domain([0, d3.sum(data, d => d.Units)])
        .range([0, width]);
    
    //colors to match the unit affordability designations
    let colorScale = d3.scaleOrdinal()
        .domain(["low-income", "moderate-income",	"middle-income", "market", "condo"])
        .range(["#065F11", "#159524", "#5CB867", "#DC4230", "#99221A"]);

    bar.selectAll("rect")
        .data(data).join("rect")
        .attr('height', 30)
        .attr()
}

export {
    loadBar,
}



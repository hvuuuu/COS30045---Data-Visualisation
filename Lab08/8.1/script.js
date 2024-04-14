function init() {
    // Define the width and height of the SVG canvas
    var w = 500;
    var h = 300;
    
    // Create a new geographical projection using the Mercator projection
    var projection = d3.geoMercator()
                        .center([144, -36.5])
                        .translate([w/2, h/2])
                        .scale(2450);    

    // Create a new geographic path generator
    var path = d3.geoPath()
                .projection(projection);
                
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    d3.json("../LGA_VIC.json").then(function(json) {
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "grey");
    });
    
}

// Set the `init` function to be called when the window is loaded
window.onload = init;
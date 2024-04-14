function init() {
    // Define the width and height of the SVG canvas
    var w = 500;
    var h = 300;
    
    // Create a new geographical projection using the Mercator projection
    // This will be used to convert GeoJSON coordinates into SVG coordinates
    var projection = d3.geoMercator()
                        .center([144, -36.5]) // Set the center of the projection to be the coordinates of Victoria
                        .translate([w/2, h/2]) // Translate the center of the map to the center of the SVG canvas
                        .scale(2450);    // Scale the map to fit the SVG canvas

    // Create a new geographic path generator
    // This will be used to convert GeoJSON objects into SVG path data
    var path = d3.geoPath()
                .projection(projection); // Set the projection to be used by the path generator

    // Create a new quantize scale for the color of the choropleth map
    var color = d3.scaleQuantize()
                    .range(["rgb(239,243,255)", "rgb(189,215,231)", "rgb(107,174,214)", "rgb(49,130,189)", "rgb(8,81,156)"]); // Set the color range
                
    // Select the chart div and append an SVG canvas to it
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w) // Set the width of the SVG canvas
                .attr("height", h) // Set the height of the SVG canvas
                .attr("fill", "grey"); // Set the fill color of the SVG canvas

    // Load the unemployment data
    d3.csv("../VIC_LGA_unemployment.csv").then(function(data) {
        // Set the domain of the color scale to be the range of the unemployment data
        color.domain([
            d3.min(data, function(d) { return d.unemployed; }),
            d3.max(data, function(d) { return d.unemployed; })
        ]);

        // Load the GeoJSON data
        d3.json("../LGA_VIC.json").then(function(json) {
            // For each row in the unemployment data
            for (var i = 0; i < data.length; i++) {
                var dataLGA = data[i].LGA; // Get the LGA name
                var dataValue = parseFloat(data[i].unemployed); // Get the unemployment value
                // For each feature in the GeoJSON data
                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name; // Get the LGA name
                    // If the LGA names match
                    if (dataLGA == jsonLGA) {
                        // Set the unemployment value of the GeoJSON feature
                        json.features[j].properties.unemployed = dataValue;
                        break;
                    }
                }
            }

            // For each feature in the GeoJSON data
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path") // Append a path element to the SVG canvas
                .attr("d", path) // Set the d attribute of the path to be the SVG path data
                .style("fill", function(d) { // Set the fill color of the path
                    var value = d.properties.unemployed; // Get the unemployment value of the feature
                    if (value) {
                        return color(value); // If the value exists, return the corresponding color
                    } else {
                        return "#ccc"; // If the value doesn't exist, return a default color
                    }
                });

            // Load the city data
            d3.csv("../VIC_city.csv").then(function(city) {
                // For each row in the city data
                svg.selectAll("circle")
                    .data(city)
                    .enter()
                    .append("circle") // Append a circle element to the SVG canvas
                    .attr("cx", function(d) { // Set the cx attribute of the circle
                        return projection([d.lon, d.lat])[0]; // Convert the longitude to SVG x coordinate
                    })
                    .attr("cy", function(d) { // Set the cy attribute of the circle
                        return projection([d.lon, d.lat])[1]; // Convert the latitude to SVG y coordinate
                    })
                    .attr("r", 3) // Set the radius of the circle
                    .style("fill", "#f00"); // Set the fill color of the circle
            });
        });
    });
}

// Set the `init` function to be called when the window is loaded
window.onload = init;
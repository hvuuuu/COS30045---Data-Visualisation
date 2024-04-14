// Set up the dimensions and padding for the chart
var w = 600;
var h = 100;
var padding = 20;

// Define the dataset containing pairs of x, y coordinates
var dataset = [
    [5, 20],
    [500, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [700, 200]
];

// Create x and y scales for mapping data to screen coordinates
var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[0]; }), d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding * 2]);

var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[1]; }), d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

// Create an SVG element and set its width and height
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create circles for each data point and bind the dataset
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")

    // Set the x-coordinate of each circle using the xScale
    .attr("cx", function(d) {
        return xScale(d[0]);
    })

    // Set the y-coordinate of each circle using the yScale
    .attr("cy", function(d) {
        return yScale(d[1]);
    })

    // Set the radius of each circle to 5
    .attr("r", 5)

    // Set the fill color of each circle based on the y-value
    .attr("fill", function(d) {
        if (d[1] === 90) {
            return "red";
        } else {
            return "slategrey";
        }
    });

// Create text elements for each data point and bind the dataset
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")

    // Set the font size, fill color, x-coordinate, and y-coordinate of each text element
    .style("font-size", "12px")
    .attr("fill", "green")
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    })

    // Set the text content of each text element to the coordinates of the data point
    .text(function(d) {
        return d[0] + "," + d[1];
    });

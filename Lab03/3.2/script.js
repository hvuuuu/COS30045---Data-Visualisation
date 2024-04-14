// Set up the dimensions and padding for the chart
var w = 500;
var h = 300;
var padding = 30;

// Define the dataset (commented out section generates random data)
// var dataset = [];
// var numDataPoints = 50;
// var xRange = Math.random() * 1000;
// var yRange = Math.random() * 1000;
// for (var i = 0; i < numDataPoints; i++) {
//     var newNumber1 = Math.floor(Math.random() * xRange);
//     var newNumber2 = Math.floor(Math.random() * yRange);
//     dataset.push([newNumber1, newNumber2]);
// }

// Define the dataset
var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
];

// Set up the x-axis scale
var xScale = d3.scaleLinear()
    .domain([0, 600])  // Set the x-axis domain
    .range([padding, w - padding * 2]);  // Set the x-axis range

// Set up the y-axis scale
var yScale = d3.scaleLinear()
    .domain([0, 120])  // Set the y-axis domain
    .range([h - padding, padding]);  // Set the y-axis range

// Create x-axis
var xAxis = d3.axisBottom()
    .ticks(5)  // Set the number of ticks on the x-axis
    .scale(xScale);

// Create y-axis
var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);  // Set the number of ticks on the y-axis

// Create an SVG element and append it to the body
var svg = d3.select("body")
    .append("svg")
    .style('padding-left', '2rem')
    .style('padding-bottom', '2rem')
    .style('border', '1px solid')
    .attr("width", w)
    .attr("height", h);

// Create circles for each data point
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]) + padding / 3;  // Set the x-coordinate of the circle
    })
    .attr("cy", function(d) {
        return yScale(d[1]);  // Set the y-coordinate of the circle
    })
    .attr("r", 5)  // Set the radius of the circle
    .attr("fill", function(d) {
        // Set the fill color based on the y-value of the data point
        return d[1] === 90 ? "red" : "slategrey";
    });

// Create text labels for each data point
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .style("font-size", "12px")
    .attr("fill", "green")
    .attr("x", function(d) {
        return xScale(d[0]) + padding / 2;  // Set the x-coordinate of the text label
    })
    .attr("y", function(d) {
        return yScale(d[1]);  // Set the y-coordinate of the text label
    })
    .text(function(d) {
        return d[0] + "," + d[1];  // Display the x and y values as text
    });

// Append the x-axis to the SVG
svg.append("g")
    .attr("transform", "translate(0, " + (h - padding) +")")
    .call(xAxis);

// Append the y-axis to the SVG
svg.append("g")
    .attr("transform", "translate(" + (padding)+ ",0)")
    .call(yAxis);

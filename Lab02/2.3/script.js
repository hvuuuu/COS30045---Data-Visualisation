// Define the width, height, and dataset
let w = 600;
let h = 100;

let dataset = [
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

// Create an SVG element and set its width and height
let svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .style('border', '1px solid black')
    .attr("height", h);

// Create circles for each data point and bind the dataset
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")

    // Set the x-coordinate of each circle based on the first value in the data point
    .attr("cx", function(d, i) {
        return d[0];
    })

    // Set the y-coordinate of each circle based on the second value in the data point
    .attr("cy", function(d) {
        return d[1];
    })
    
    // Set the radius of each circle to 5
    .attr("r", 5)
    // Set the fill color of each circle based on the second value in the data point
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
    .attr("x", function(d, i) {
        return d[0] - 3;
    })
    .attr("y", function(d) {
        return d[1] - 3;
    })
    // Set the text content of each text element to the coordinates of the data point
    .text(function(d) {
        return d[0] + "," + d[1];
    });

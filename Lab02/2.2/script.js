// Define the width, height, bar padding, and dataset
let w = 500;
let h = 100;
let barPadding = 1;
let dataset = [14, 5, 26, 23, 9, 13, 7, 20, 30, 8, 28, 22];

// Create an SVG element and set its width and height
let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Create rectangles for each data point and bind the dataset
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")

    // Set the x-position of each rectangle based on its index in the dataset
    .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })

    // Set the y-position of each rectangle based on the data value
    .attr("y", function(d) {
        return h - d * 4;
    })

    // Set the width of each rectangle based on the dataset length and bar padding
    .attr("width", w / dataset.length - barPadding)

    // Set the height of each rectangle based on the data value
    .attr("height", function(d) {
        return d * 4;
    })

    // Set the fill color of each rectangle to navy
    .attr("fill", 'navy');

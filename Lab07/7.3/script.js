// Function to initialize the stacked bar chart
function init() {
    // Define the width and height of the SVG canvas
    var w = 300; 
    var h = 300; 

    // Initial dataset representing values for each category
    var dataset = [
        { apples: 5, oranges: 10, grapes: 32 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32},
        { apples: 7, oranges: 23, grapes: 35},
        { apples: 23, oranges: 17, grapes: 43},
    ]; 

    // Define the x-scale for positioning bars
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length)) // Domain is the indices of the dataset
                    .rangeRound([0, w]) // Range of x values, rounded for pixel accuracy
                    .paddingInner(0.05); // Padding between bars

    // Define the y-scale for the height of bars
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {
                        return d.apples + d.oranges + d.grapes;
                    })])
                    .range([h, 0]);

    // Define a color scale using D3's schemeCategory10 color scheme
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Define the stack generator function to compute the stack layout
    var stack = d3.stack()
                    .keys(["apples", "oranges", "grapes"])
                    .order(d3.stackOrderReverse); // Reverse the order of stacking
    
    // Generate the stacked series using the stack function
    var series = stack(dataset);

    // Select the chart div and append an SVG element with the specified width and height
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Initialize a selection of groups for each stack
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function (d, i) {
                        return color(i); // Set fill color for each stack using the color scale
                    });

    // Draw rectangles for each stack in each group
    var rects = groups.selectAll("rect")
                        .data(function(d) { return d; })
                        .enter()
                        .append("rect")
                        .attr("x", function (d, i) {
                            return xScale(i); // Position rectangles along the x-axis
                        })
                        .attr("y", function (d, i) {
                            return yScale(d[1]); // Position rectangles based on the top value of each stack
                        })
                        .attr("height", function(d) {
                            return yScale(d[0]) - yScale(d[1]); // Compute the height of each rectangle
                        })
                        .attr("width", xScale.bandwidth()); // Set the width of each rectangle
           

}

// Call the init function when the window is loaded
window.onload = init;

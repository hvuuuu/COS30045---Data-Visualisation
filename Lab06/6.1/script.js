function init() {
    // Define the width, height, bar padding, and dataset
    var w = 600; // Width of the SVG canvas
    var h = 250; // Height of the SVG canvas
    var maxValue = 25; // Maximum value for generating random data
    var barPadding = 1; // Padding between bars
    var dataset = [14, 5, 26, 23, 9, 13, 7, 20, 30, 8, 28, 22]; // Initial dataset

    // Define x and y scales
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length)) // Domain is the indices of the dataset
                    .rangeRound([0, w]) // Range of x values, rounded for pixel accuracy
                    .paddingInner(0.05); // Padding between bars

    var yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset)]) // Domain is from 0 to maximum value in the dataset
                    .range([0,h]); // Range of y values

    // Create an SVG element and set its width and height
    var svg = d3.select("#chart")
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
            return xScale(i);
        })

        // Set the y-position of each rectangle based on the data value
        .attr("y", function(d) {
            return h - yScale(d);
        })

        // Set the width of each rectangle based on the dataset length and bar padding
        .attr("width", xScale.bandwidth())

        // Set the height of each rectangle based on the data value
        .attr("height", function(d) {
            return yScale(d);
        })

        // Set the fill color of each rectangle 
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
        })

        // Mouseover event listener to highlight bars
        .on("mouseover", function(event, d){
            d3.select(this)
                .attr("fill", "orange"); // Change fill color on mouseover
                
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            // Display tooltip with value on mouseover
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("fill", "black")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .text(d);
        })

        // Mouseout event listener to reset bar color
        .on("mouseout", function(event, d){
            d3.select("#tooltip").remove(); // Remove tooltip

            // Restore original fill color on mouseout
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", "rgb(0, 0, " + Math.round(d * 10) + ")");
        })
        // Add a title for each bar for accessibility
        .append("title")
        .text(function(d){
            return "This value is " + d;
        });

    // Event listener for adding a new data point
    d3.select("#add")
        .style("background-color", "#1E90FF")
        .style("border", "#1E90FF")
        .style("color", "white")
        .on("click", function() {
            // Generate a new random number within the defined range
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber); // Add new number to the dataset

            // Update xScale domain to accommodate the new data point
            xScale.domain(d3.range(dataset.length));

            // Update bars
            var bars = svg.selectAll("rect")
                            .data(dataset);

            // Enter selection for new bars
            bars.enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                })
                // Mouseover event listener for new bars
                .on("mouseover", function(event, d){
                    d3.select(this)
                        .attr("fill", "orange"); // Change fill color on mouseover
                    
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
        
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("fill", "black")
                        .attr("font-size", "11px")
                        .attr("font-weight", "bold")
                        .text(d);
                })
                // Mouseout event listener for new bars
                .on("mouseout", function(event, d){
                    d3.select("#tooltip").remove(); // Remove tooltip
        
                    d3.select(this)
                        .transition()
                        .duration(250)
                        .attr("fill", "rgb(0, 0, " + Math.round(d * 10) + ")");
                });

            // Merge enter and update selections for smooth transition
            bars.merge(bars)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });
        });

    // Event listener for removing the first data point
    d3.select("#remove")
        .style("background-color", "orange")
        .style("border", "orange")
        .style("color", "white")
        .on("click", function() {
            dataset.shift(); // Remove the first data point

            // Update xScale domain
            xScale.domain(d3.range(dataset.length));

            // Update bars
            var bars = svg.selectAll("rect")
                            .data(dataset);

            // Remove exiting bars
            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            // Update position and size of remaining bars
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });
        });
}

// Call init function when window is loaded
window.onload = init;

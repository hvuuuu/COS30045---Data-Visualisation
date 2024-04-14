function init() {
    // Define the width and height of the SVG canvas
    var w = 600;
    var h = 300;
    var padding = 30;

    // Load the CSV data and define how to parse it
    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            // Parse the CSV data, converting year and month to a Date object and number to a numeric value
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        // Code dependent on the loaded data should be placed here
        var dataset = data;
        console.log(dataset, ["date", "number"]);

        // Define the scales and other chart elements using the loaded data
        var xScale = d3.scaleTime()
            .domain([d3.min(dataset, function(d) { return d.date; }),
                     d3.max(dataset, function(d) { return d.date; })])
            .range([padding * 2, w - padding]); // Adjust range to include padding

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([h - padding, padding]); // Adjust range to include padding

        var area = d3.area()
                    .x(function(d) { return xScale(d.date); }) // Set x-coordinate for the area
                    .y0(function(d) { return yScale.range()[0]; }) // Set lower y-coordinate for the area
                    .y1(function(d) { return yScale(d.number); }); // Set upper y-coordinate for the area

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Append the area plot to the SVG
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "slategrey") // Set the fill color for the area
            .style("stroke-width", 0.5);


        // Create x-axis
        var xAxis = d3.axisBottom()
                        .ticks(8)  // Set the number of ticks on the x-axis
                        .scale(xScale);
         
        // Create y-axis
        var yAxis = d3.axisLeft()
                        .scale(yScale)
                        .ticks(10);  // Set the number of ticks on the y-axis

        // Append the x-axis to the SVG
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")") // Adjust the x position
            .call(xAxis);

        // Append the y-axis to the SVG
        svg.append("g")
            .attr("transform", "translate(" + padding * 2 + ",0)") // Adjust the y position
            .call(yAxis);

        // Append the red dashed line
        svg.append("line")
            .attr("class", "area halfMilMark") // Set the class for styling
            .attr("stroke", "red") // Set the color to red
            .attr("stroke-dasharray", "5,5") // Make it dashed
            .attr("x1", padding * 2)
            .attr("y1", yScale(500000)) // Set the starting y-coordinate for the line
            .attr("x2", w - padding)
            .attr("y2", yScale(500000)); // Set the ending y-coordinate for the line
            
        // Append text label for the red dashed line
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("fill", "red") // Set the text color to red
            .style("font-size", "12px") // Set the font size
            .attr("x", padding * 2 + 10)
            .attr("y", yScale(500000) - 7) // Set the y-coordinate for the text label
            .text("Half a million unemployed"); // Set the text content
    });
}

// Call the init function when the window is loaded
window.onload = init;

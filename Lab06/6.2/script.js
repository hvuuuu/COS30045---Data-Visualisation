function init() {
    // Define the width, height, bar padding, and dataset
    var w = 650; // Width of the SVG canvas
    var h = 250; // Height of the SVG canvas
    var maxValue = 25; // Maximum value for generating random data
    var barPadding = 1; // Padding between bars
    var dataset = [14, 5, 26, 23, 9, 13, 7, 20, 25, 8, 28, 22]; // Initial dataset
    var padding = 30;

    // Define x and y scales
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length)) // Domain is the indices of the dataset
                    .rangeRound([padding, w - padding]) // Range of x values with padding
                    .paddingInner(0.05); // Padding between bars
                    

    var yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset)]) // Domain is from 0 to maximum value in the dataset
                    .range([h - padding, padding]); // Range of y values with padding

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
            return yScale(d);
        })

        // Set the width of each rectangle based on the dataset length and bar padding
        .attr("width", xScale.bandwidth())

        // Set the height of each rectangle based on the data value
        .attr("height", function(d) {
            return h - padding - yScale(d);
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
                .attr("font-size", "13px")
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
                    return yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - padding - yScale(d);
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
                        .attr("font-size", "13px")
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

            // Merge selection for existing and new bars and transition
            bars.merge(bars)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - padding - yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            // Update x-axis
            svg.select(".x-axis")
                .call(d3.axisBottom(xScale));
        });

    // Event listener for removing the first data point
    d3.select("#remove")
        .style("background-color", "orange")
        .style("border", "orange")
        .style("color", "white")
        .on("click", function() {
            dataset.shift(); // Remove the first data point

            // Update xScale domain to accommodate the removed data point
            xScale.domain(d3.range(dataset.length));

            // Update bars
            var bars = svg.selectAll("rect")
                            .data(dataset);

            // Remove exiting bars with transition
            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w) // Move off screen
                .remove();

            // Update position and size of remaining bars with transition
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .duration(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - padding - yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            // Update x-axis
            svg.select(".x-axis")
                .call(d3.axisBottom(xScale));
        });

    // Event listener for sorting bars
    d3.selectAll("#sort")
        .style("background-color", "green")
        .style("border", "green")
        .style("color", "white")
        .on("click", function() {
            sortBars(); // Call sortBars function when sort button is clicked
        });

    // Function to sort bars based on sortOrder
    var sortOrder = false; // Initial sorting order

    var sortBars = function() {
        sortOrder = !sortOrder; // Toggle sorting order

        // Sort bars based on sortOrder and transition
        svg.selectAll("rect")
            .sort(function(a, b) {
                if (sortOrder) {
                    return d3.ascending(a, b);
                } else {
                    return d3.descending(a, b);
                }
            })
            .transition()
            .duration(1000)
            .attr("x", function(d, i){
                return xScale(i); // Update x position based on sorted order
            });
    };

    // Append the x-axis to the SVG
    var xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x-axis") // Add class for easy selection
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    // Append the y-axis to the SVG
    var yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis") // Add class for easy selection
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
}

// Call init function when window is loaded
window.onload = init;

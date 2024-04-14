function init() {
    // Define the width, height, bar padding, and dataset
    var w = 600;
    var h = 250;
    var maxValue = 25;
    var barPadding = 1;
    var dataset = [14, 5, 26, 23, 9, 13, 7, 20, 30, 8, 28, 22];

    // Define the x and y scales
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset)])
                    .range([0,h]);

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
        });

    // Add text labels for each data point
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d ,i) {
            return i * (w /dataset.length) + (w / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("fill", "white")
        .attr("font-size", "11px")
        .attr("text-anchor", "middle");

    // Event listener for adding a new data point
    d3.select("#add")
        .style("background-color", "#1E90FF")
        .style("border", "#1E90FF")
        .style("color", "white")
        .on("click", function() {
            var maxValue = 25;
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);

            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                            .data(dataset);
            var text = svg.selectAll("text")
                            .data(dataset);
            bars.enter()
                .append("rect")
                .merge(bars)
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

            text.enter()
                .append("text")
                .merge(text)
                .transition()
                .duration(500)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d ,i) {
                    return xScale(i) + xScale.bandwidth() / 2 ;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "white")
                .attr("font-size", "11px")
                .attr("text-anchor", "middle");

        });

    // Event listener for removing a data point
    d3.select("#remove")
        .style("background-color", "orange")
        .style("border", "orange")
        .style("color", "white")
        .on("click", function() {
            dataset.shift();

            xScale.domain(d3.range(dataset.length));

            var bars = svg.selectAll("rect")
                            .data(dataset);
            var text = svg.selectAll("text")
                            .data(dataset);

            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .duration(500)
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
                });

            text.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            svg.selectAll("text")
                .data(dataset)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2 ;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                });

        });
}

// Initialize the function when the window loads
window.onload = init;

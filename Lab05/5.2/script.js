function init() {
    // Define the width, height, bar padding, and dataset
    var w = 600;
    var h = 250;
    var maxValue = 25;
    var barPadding = 1;
    var dataset = [14, 5, 26, 23, 9, 13, 7, 20, 30, 8, 28, 22];

    // Create a band scale for the x-axis
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    // Create a linear scale for the y-axis
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

    // Create text elements for each data point and bind the dataset
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        // Set the text content of each element to the data value
        .text(function(d) {
            return d;
        })
        // Set the x-position of each text element
        .attr("x", function(d , i) {
            return i * (w /dataset.length) + (w / dataset.length - barPadding) / 2;
        })
        // Set the y-position of each text element
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("fill", "white")
        .attr("font-size", "11px")
        .attr("text-anchor", "middle");

    d3.select("#update")
        .style("background-color", "#1E90FF")
        .style("border", "#1E90FF")
        .style("color", "white")
        .on("click", function() {
            // Define the dataset (commented out section generates random data)
            var numValues = dataset.length; // Generate a random number of values
            dataset = [];
            var maxValue = 25;
            // Generate random data points
            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            //update xScale to fit new dataset
            xScale.domain(d3.range(dataset.length))

            //update yScale to fit new dataset
            yScale.domain([0, d3.max(dataset)])

            // Update rectangles for each data point and bind the dataset
            svg.selectAll("rect")
                .data(dataset)
                // Update the y-position of each rectangle based on the new data value
                .attr("y", function(d){
                    return h - yScale(d);
                })
                // Update the height of each rectangle based on the new data value
                .attr("height", function(d) {
                    return yScale(d);
                })
                // Update the fill color of each rectangle based on the new data value
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            // Update text elements for each data point and bind the dataset
            svg.selectAll("text")
                .data(dataset)
                // Update the text content of each element to the data value
                .text(function(d) {
                    return d;
                })
                // Update the x-position of each text element
                .attr("x", function(d ,i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                // Update the y-position of each text element
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "white")
                .attr("font-size", "11px")
                .attr("text-anchor", "middle");

        });

    d3.select("#tran1")
        .style("background-color", "orange")
        .style("border", "orange")
        .style("color", "white")
        .on("click", function() {
            // Define the dataset (commented out section generates random data)
            var numValues = dataset.length; // Generate a random number of values
            dataset = [];
            var maxValue = 25;
            // Generate random data points
            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            //update xScale to fit new dataset
            xScale.domain(d3.range(dataset.length))

            //update yScale to fit new dataset
            yScale.domain([0, d3.max(dataset)])

            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d, i) {
                    return i / dataset.length * 1000;
                })
                .duration(500)
                .ease(d3.easeCircleIn)
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            svg.selectAll("text")
                .data(dataset)
                .transition()
                .duration(500)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d ,i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "white")
                .attr("font-size", "11px")
                .attr("text-anchor", "middle");

        });

    d3.select("#tran2")
        .style("background-color", "green")
        .style("border", "green")
        .style("color", "white")
        .on("click", function() {
            // Define the dataset (commented out section generates random data)
            var numValues = dataset.length; // Generate a random number of values
            dataset = [];
            var maxValue = 25;
            // Generate random data points
            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
            }

            //update xScale to fit new dataset
            xScale.domain(d3.range(dataset.length))

            //update yScale to fit new dataset
            yScale.domain([0, d3.max(dataset)])
            
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d, i) {
                    return i / dataset.length * 1000;
                })
                .duration(500)
                .ease(d3.easeBounceOut)
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });

            svg.selectAll("text")
                .data(dataset)
                .transition()
                .duration(500)
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d ,i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function(d) {
                    return h - yScale(d) + 14;
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "white")
                .attr("font-size", "11px")
                .attr("text-anchor", "middle");

        });
}    

window.onload = init;
    
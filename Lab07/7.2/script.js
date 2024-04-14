// Function to initialize the pie chart
function init() {
    // Define the width and height of the SVG canvas
    var w = 300; 
    var h = 300; 

    // Initial dataset representing values for each slice of the pie chart
    var dataset = [5, 10, 20, 45, 6, 25]; 

    // Define the outer and inner radius of the pie chart
    var outerRadius = w / 2;
    var innerRadius = 0;

    // Define a color scale using D3's schemeCategory10 color scheme
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Define the arc generator function
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // Define the pie function to compute angles for the pie chart
    var pie = d3.pie();

    // Select the chart div and append an SVG element with the specified width and height
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Initialize a selection of arc groups for each data point
    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset)) // Compute angles for the dataset using the pie function
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")"); 

    // Draw arcs for each data point
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i); // Set fill color for each arc using the color scale
        })
        .attr("d", function(d, i) {
            return arc(d, i); // Generate SVG path data for each arc using the arc function
        })
        .on("mouseover", function(event, d) {
            var i = dataset.indexOf(d.data);
            // Display the color and number value on hover
            d3.select(this)
                .attr("stroke", "black")
                .attr("stroke-width", "2px");
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", w / 2)
                .attr("y", h / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr("fill", "black")
                .text("Color: " + color(i) + " Number: " + d.data);
        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .attr("stroke", "none");
            // Remove the color and number value when not hovering
            d3.select("#tooltip").remove();
        });

    // Add text labels at the centroid of each arc
    arcs.append("text")
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) +")"; // Position text at the centroid of each arc
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.value; // Display the value of each data point as text
        });
}

// Call the init function when the window is loaded
window.onload = init;
// Define the width, height, and bar padding
let w = 500;
let h = 100;
let barPadding = 1;

// Define a function for creating a bar chart
function barChart() {
    // Select the element with id 'chart' and append an SVG element to it
    let svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Create rectangles for each data point and bind the dataset (wombatSightings)
    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")

        // Set the x-position of each rectangle based on its index in the dataset
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length);
        })

        // Set the y-position of each rectangle based on the number of wombats
        .attr("y", function(d) {
            return h - (d.wombats * 4);
        })

        // Set the width of each rectangle based on the dataset length and bar padding
        .attr("width", w / wombatSightings.length - barPadding)

        // Set the height of each rectangle based on the number of wombats
        .attr("height", function(d) {
            return d.wombats * 4;
        })

        // Set the fill color of each rectangle based on the number of wombats
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d.wombats * 10) + ")";
        });
};

// Load CSV data using D3's promise and execute the function when data is ready
d3.csv('Task_2.4_data.csv').then(function(data) {
    // Log the loaded data to the console
    console.log(data);

    // Assign the loaded data to the wombatSightings variable
    wombatSightings = data;

    // Call the barChart function with the loaded data
    barChart(wombatSightings);
});

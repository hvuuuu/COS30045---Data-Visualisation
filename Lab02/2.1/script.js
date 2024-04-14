// Define a dataset of numeric values
let dataset = [14, 5, 26, 23, 9];

// Select the 'body' element and bind the dataset to paragraphs
d3.select("body").selectAll("p")
    .data(dataset)
    
    // Enter selection: Create placeholders for data without corresponding DOM elements
    .enter()
    
    // Append a new 'p' element for each data point without a corresponding paragraph
    .append("p")
    
    // Set the text content of each paragraph based on the data value (d)
    .text(function(d) {
        // Display a message based on whether the data value is less than 10
        if (d < 10) {
            return "Joe watched " + d + " cat videos today.";
        } else {
            return "Warning: Joe watched " + d + " cat videos today.";   
        }
    })
    
    // Set the text color of each paragraph based on the data value (d)
    .style("color", function(d) {
        // Apply red color if the data value is greater than or equal to 10; otherwise, no specific color
        if (d >= 10) {
            return "red";
        } else {
            return null;
        }
    });

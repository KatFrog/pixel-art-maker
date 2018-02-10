// Variables and constants for the Pixel Art Maker
let gridColor = "rgb(0,0,0)";
let isDrawing = false;
const bgColor = "rgb(254,253,230)";
const defaultHeight = 10;
const defaultWidth = 10;



// When size is submitted by the user, call makeGrid()
function makeGrid(height, width) {
    let rowIdAssign = "";
    let rowId = "";
    for (let j = 1; j <= height; ++j) {
        rowIdAssign = "<tr id=\"row" + j + "\">";
        rowId = "#row" + j;
        $("#pixel_canvas").append(rowIdAssign);
        for (let k = 1; k <= width; ++k) {
            $(rowId).append("<td>");
        }
    }
}

// Clear the HTML table to allow a new grid to be created
function clearGrid() {
    $("#pixel_canvas").empty();
}

// Wait until the DOM is loaded before running jQuery code
$(document).ready(function() {

    // Initial setup of the drawing grid
    makeGrid(defaultHeight, defaultWidth);

    // Event listener for setting up the grid
    $("#size-button").on("click", function(evt) {
        evt.preventDefault();
        let width = $("#input_width").val();
        let height = $("#input_height").val();
        if ((width > 60) || (width <= 0)){
            alert("Please pick a width between 1 and 60.");
        } else if ((height > 60) || (height <= 0)){
            alert("Please pick a height between 1 and 60.");
        } else {
            clearGrid();
            makeGrid(height, width);
        }
    });

    // Event listener for color picker
    $("#colorPicker").on("change", function(evt) {
        gridColor = $(this).val();
    });

    // Event listener to clear the canvas
    $("#clear-canvas").on("click", function() {
        $("#pixel_canvas").find("td").css("background-color", bgColor);
    });

    // Event listener to change the background color on a single click
    $("#pixel_canvas").on("click", "td", function(evt) {
        if ($(evt.target).hasClass("clicked")) {
            $(evt.target).attr("style", "background-color: " + bgColor);
            $(evt.target).removeClass("clicked");
        } else {
            $(evt.target).attr("style", "background-color: " + gridColor);
            $(evt.target).addClass("clicked");
        }
    });

    // Event listeners to turn continuous drawing on and off
    $("#pixel_canvas").mousedown(function(evt) {
        isDrawing = true;
    });

    $("#pixel_canvas").mouseup(function(evt) {
        isDrawing = false;
    });

    // Event listener to paint the canvas continuously
    $("#pixel_canvas").mouseover(function(evt) {
        if (isDrawing) {
            $(evt.target).attr("style", "background-color: " + gridColor);
            $(evt.target).addClass("clicked");
        }
    });
});

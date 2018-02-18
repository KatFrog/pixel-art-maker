// Variables and constants for the Pixel Art Maker
let gridColor = "rgb(0,0,0)";
let isDrawing = false;
let randomMode = false;
const bgColor = "rgb(254,253,230)";
const defaultHeight = 10;
const defaultWidth = 10;
const minCanvasSize = 1;
const maxCanvasSize = 60;



// When size is submitted by the user, call makeGrid()
function makeGrid(height, width) {
    for (let j = 1; j <= height; ++j) {
        $("#pixel_canvas").append("<tr>");
        for (let k = 1; k <= width; ++k) {
            $("tr:last-child").append("<td>");
        }
    }
}

// Clear the HTML table to allow a new grid to be created
function clearGrid() {
    $("#pixel_canvas").empty();
}

// From http://webdesignnomad.com/snippets/random-color-javascript/
// Creates a random hex color for Random Color Mode
function randomHex(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Set the grid color based on whether or not random color mode is enabled
function newColor () {
  let tempColor;
  if (randomMode) {
    tempColor = randomHex();
  } else {
    tempColor  = $("#colorPicker").val();
  }
  return tempColor;
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
        if ((width <= minCanvasSize) || (width > maxCanvasSize)){
            alert("Please pick a width between " + minCanvasSize + " and " + maxCanvasSize + ".");
        } else if ((height <= minCanvasSize) || (height > maxCanvasSize)){
            alert("Please pick a height between " + minCanvasSize + " and " + maxCanvasSize + ".");
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
            gridColor = newColor();
            $(evt.target).attr("style", "background-color: " + gridColor);
            $(evt.target).addClass("clicked");
        }
    });

    // Turn random color mode on and off
    $("#randomColor").on("click", function(evt) {
      if (randomMode) {
        randomMode = false;
        $(".randomColor").attr("style", "color: blue");
      } else {
        randomMode = true;
        $(".randomColor").attr("style", "color: green");
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
            gridColor = newColor();
            $(evt.target).attr("style", "background-color: " + gridColor);
            $(evt.target).addClass("clicked");
        }
    });
});

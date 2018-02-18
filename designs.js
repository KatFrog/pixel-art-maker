// Variables and constants for the Pixel Art Maker
let canvasColor = "rgb(0,0,0)";
let isDrawing = false;
let randomMode = false;
const bgColor = "rgb(254,253,230)";
const defaultHeight = 20;
const defaultWidth = 20;
const minCanvasSize = 1;
const maxCanvasSize = 40;
const drawingCanvas = $("#pixel_canvas");
const colorPicker = $("#colorPicker");
const inputHeight = $("#input_height");
const inputWidth = $("#input_width");
const eraseCanvas = $("#erase-canvas");



// When size is submitted by the user, call makeCanvas()
function makeCanvas(height, width) {
    for (let j = 1; j <= height; ++j) {
        drawingCanvas.append("<tr>");
        for (let k = 1; k <= width; ++k) {
            $("tr:last-child").append("<td>");
        }
    }
}

// Clear the HTML table to allow a new canvas to be created
function clearCanvas() {
    drawingCanvas.empty();
}

// From http://webdesignnomad.com/snippets/random-color-javascript/
// Creates a random hex color for Random Color Mode
function randomHex(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Set the canvas color based on whether or not random color mode is enabled
function newColor () {
  let tempColor;
  if (randomMode) {
    tempColor = randomHex();
  } else {
    tempColor  = colorPicker.val();
  }
  return tempColor;
}


// Wait until the DOM is loaded before running jQuery code
$(document).ready(function() {

    // Initial setup for the drawing canvas
    makeCanvas(defaultHeight, defaultWidth);

    // Set up the min and max for input height
    inputHeight.attr("min", minCanvasSize.toString());
    inputHeight.attr("max", maxCanvasSize.toString());
    inputHeight.attr("value", defaultHeight.toString());

    // Set up the min and max values for input width
    inputWidth.attr("min", minCanvasSize.toString());
    inputWidth.attr("max", maxCanvasSize.toString());
    inputWidth.attr("value", defaultWidth.toString());



    // Event listener for setting up the canvas
    $("#size-button").on("click", function(evt) {
        evt.preventDefault();
        let width = inputWidth.val();
        let height = inputHeight.val();
        if ((width < minCanvasSize) || (width > maxCanvasSize)){
            alert("Please pick a width between " + minCanvasSize + " and " + maxCanvasSize + ".");
        } else if ((height < minCanvasSize) || (height > maxCanvasSize)){
            alert("Please pick a height between " + minCanvasSize + " and " + maxCanvasSize + ".");
        } else {
            clearCanvas();
            makeCanvas(height, width);
        }
    });

    // Event listeners for choosing coloring Mode
    $("#pickedMode").on("click", function(evt) {
        $(".pick-color").css("opacity", 1);
        randomMode = false;
    });

    $("#randomColors").on("click", function(evt) {
      $(".pick-color").css("opacity", 0);
      randomMode = true;
    });


    // Event listener for color picker
    colorPicker.on("change", function(evt) {
        canvasColor = $(this).val();
    });

    // Event listener to erase the canvas
    eraseCanvas.on("click", function() {
        drawingCanvas.find("td").css("background-color", bgColor);
    });

    // Event listener to change the background color on a single click
    drawingCanvas.on("click", "td", function(evt) {
        if ($(evt.target).hasClass("clicked")) {
            $(evt.target).attr("style", "background-color: " + bgColor);
            $(evt.target).removeClass("clicked");
        } else {
            canvasColor = newColor();
            $(evt.target).attr("style", "background-color: " + canvasColor);
            $(evt.target).addClass("clicked");
        }
    });

    // Event listeners to turn continuous drawing on and off
    drawingCanvas.mousedown(function(evt) {
        isDrawing = true;
    });

    drawingCanvas.mouseup(function(evt) {
        isDrawing = false;
    });

    // Event listener to paint the canvas continuously
    drawingCanvas.mouseover(function(evt) {
        if (isDrawing) {
            canvasColor = newColor();
            $(evt.target).attr("style", "background-color: " + canvasColor);
            $(evt.target).addClass("clicked");
        }
    });
});

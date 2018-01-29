// Variables for drawing grid
let width = 10;
let height = 10;
let row_id_assign = "";
let row_id = "";
let isDrawing = false;

// Variables for color sizePicker
let grid_color = 'rgb(0,0,0)';

// When size is submitted by the user, call makeGrid()
function makeGrid() {
    for (let j = 1; j <= height; ++j) {
        row_id_assign = "<tr id=\"row" + j + "\">";
        row_id = "#row" + j;
        $('#pixel_canvas').append(row_id_assign);
        for (let k = 1; k <= width; ++k) {
            $(row_id).append("<td>");
        };
    };
};

// Clear the HTML table to allow a new grid to be created
function clearGrid() {
    $('#pixel_canvas').empty();
};

// Wait until the DOM is loaded before running jQuery code
$(document).ready(function() {

    // Initial setup of the drawing grid
    makeGrid();

    // Event listener for setting up the grid
    $('#size_button').on("click", function(evt) {
        evt.preventDefault();
        width = $('#input_width').val();
        height = $('#input_height').val();
        if ((width > 40) || (width <= 0)){
            alert("Please pick a width between 1 and 40.");
        } else if ((height > 40) || (height <= 0)){
            alert("Please pick a height between 1 and 40.");
        } else {
            clearGrid();
            makeGrid();
        }
    });

    // Event listener for color picker
    $('#colorPicker').on('change', function(evt) {
        grid_color = $(this).val();
    });

    // Event listener to clear the canvas
    $('#clear-canvas').on("click", function() {
        $("#pixel_canvas").find("td").css("background-color", "rgb(254,253,230)")
    });

    // Event listener to change the background color on a single click
    $('#pixel_canvas').on('click', 'td', function(evt) {
        if ($(evt.target).hasClass('clicked')) {
            $(evt.target).attr('style', 'background-color: rgb(254,253,230)');
            $(evt.target).removeClass('clicked');
        } else {
            $(evt.target).attr('style', 'background-color: ' + grid_color);
            $(evt.target).addClass('clicked');
        };
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
            $(evt.target).attr('style', 'background-color: ' + grid_color);
            $(evt.target).addClass('clicked');
        }
    });
});

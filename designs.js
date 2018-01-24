// Variables for drawing grid
let width;
let height;
let row_id_assign = "";
let row_id = "";

// Variables for color sizePicker
let grid_color = 'rgb(0,0,0)';

// When size is submitted by the user, call makeGrid()
function makeGrid() {
    for (let j = 1; j <= height; ++j) {
        row_id_assign = "<tr id=\"row" + j + "\">";
        row_id = "#row" + j;
        $('#pixel_canvas').append(row_id_assign);
        for (let k = 1; k <= width; ++k) {
            const row = $(row_id).append("<td>");
            const cell = $(row).children(':last');
        };
    };
};

// Clear the HTML table to allow a new grid to be created
function clearGrid() {
    $('#pixel_canvas').empty();
};

// Wait until the DOM is loaded before running jQuery code
document.addEventListener('DOMContentLoaded', function() {
    $('#size_button').on("click", function(evt) {
        evt.preventDefault();
        width = $('#input_width').val();
        height = $('#input_height').val();
        clearGrid();
        makeGrid();
    });
    $('#colorPicker').on('change', function(evt) {
        grid_color = $(this).val();
    });
    $('#clear-canvas').on("click", function() {
        $("#pixel_canvas").find("td").css("background-color", "rgb(254,253,230)")});
    $('#pixel_canvas').on('click', 'td', function(evt) {
        $(evt.target).attr('style', 'background-color: ' + grid_color)});
});

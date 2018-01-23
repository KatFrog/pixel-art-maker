// Variables for drawing grid
let width;
let height;
let row_id_assign = "";
let row_id = "";

// Variables for color sizePicker
let grid_color;

// When size is submitted by the user, call makeGrid()
function makeGrid() {
    for (let j = 1; j <= height; ++j) {
        row_id_assign = "<tr id=\"row" + j + "\">";
        row_id = "#row" + j;
        $('#pixel_canvas').append(row_id_assign);
        for (k = 1; k <= width; ++k) {
            const row = $(row_id).append("<td>");
            const cell = $(row).children(':last');
            // Set up event listeners for each cell using JavaScript closures
            cell.on("click", function(evt) {
                cell.attr("style", "background-color: " + grid_color);
            });
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
});

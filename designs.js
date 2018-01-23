// Variables for drawing grid
let width;
let height;
let row_id_assign = "";
let row_id = "";
let cell_id_assign = "";
let cell_id = "";

// Variables for color sizePicker
let grid_color;


// When size is submitted by the user, call makeGrid()

function makeGrid() {
    let k;
    for (let j = 1; j <= height; ++j) {
        // insert row tags
        row_id_assign = "<tr id=\"row" + j + "\">";
        row_id = "#row" + j;
        $('#pixel_canvas').append(row_id_assign);
        for (k = 1; k <= width; ++k) {
            const row = $(row_id).append("<td>");
            const cell = $(row).children(':last');
            cell.on("click", function(evt){
                cell.attr("style", "background-color: " + grid_color);
            });
        };
        //cell_id = "#cell" + k;
        //$(cell_id).append("</tr>");
    };

};

function clearGrid() {
    $('#pixel_canvas').empty();
};

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

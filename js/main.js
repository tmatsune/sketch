console.log("Sketch Program");

const GRID_ATTR = {
    CELL_SIZE: 15,
    BORDER: .5,
    TOTAL_CELL: 15,
};
var key_pressed = false;
const grid_cells = [];

class Cell{
    constructor(div, pos){
        this.on = false;
        this.div = div;
        this.pos = pos;
    };
};
class User{
    constructor(){
        this.mouse_pos = [0,0];
        this.mouse_clicked = false;
        this.over_canvas = false; 
        this.curr_div = document.createElement("div");
        this.curr_div.style["position"] = "absolute";
        this.curr_div.style["width"] = `${GRID_ATTR.CELL_SIZE}px`;
        this.curr_div.style["height"] = `${GRID_ATTR.CELL_SIZE}px`;
        this.curr_div.style["backgroundColor"] = "transparent";
        this.curr_div.style["boxSizing"] = "border-box";
        this.curr_div.style["flexShrink"] = "0";

    }
};
const user = new User();
const canvas = document.querySelector(".canvas");
const canvas_rect = canvas.getBoundingClientRect();
canvas.appendChild(user.curr_div);

const top_rect = canvas_rect.top
const left_rect = canvas_rect.left;
const CANVAS = {
    pos: [left_rect, top_rect],
    over_canvas: false,
    offset: [0,0],
}

console.log(left_rect, top_rect);

document.addEventListener("mousedown", (e) => { key_pressed = true; });
document.addEventListener("mouseup", (e) => { key_pressed = false; });
canvas.addEventListener('mouseenter', () => { CANVAS.over_canvas = true; });
canvas.addEventListener('mouseleave', () => { CANVAS.over_canvas = false; });
window.addEventListener("scroll", () => {
    CANVAS.offset = [window.pageXOffset, window.pageYOffset];
});

document.addEventListener("mousemove", (e) => { 
    const mouse_x = e.clientX;
    const mouse_y = e.clientY;
    if(CANVAS.over_canvas){
        var grid_x = Math.floor( (CANVAS.offset[0] + mouse_x - CANVAS.pos[0]) / GRID_ATTR.TOTAL_CELL  );
        var grid_y = Math.floor( (CANVAS.offset[1] + mouse_y - CANVAS.pos[1]) / GRID_ATTR.TOTAL_CELL  );   

        if(grid_x >= 0 & grid_x < grid_cells[0].length & grid_y >= 0 & grid_y < grid_cells.length){
            var curr_pos = [
                Math.floor(grid_x*15) + CANVAS.pos[0], 
                Math.floor(grid_y*15) + CANVAS.pos[1],
            ];
            user.curr_div.style["left"] = `${curr_pos[0]}px`;
            user.curr_div.style["top"] = `${curr_pos[1]}px`;
            user.curr_div.style["backgroundColor"] = "black"
            if(key_pressed){
                grid_cells[grid_y][grid_x].div.style["backgroundColor"] = "black";
            }
        }
    }else{
        user.curr_div.style["backgroundColor"] = "transparent";
    }
});


for(let i = 0; i < 32; i++){
    const div_row = document.createElement("div");
    const row = [];
    div_row.style["display"] = "flex";
    for(let j = 0; j < 60; j++){
        const cell = document.createElement("div");
        cell.style["width"] = `${GRID_ATTR.CELL_SIZE}px`;
        cell.style["height"] = `${GRID_ATTR.CELL_SIZE}px`;
        cell.style["border"] = `solid black ${GRID_ATTR.BORDER}px`;
        cell.style["boxSizing"] = "border-box";
        cell.style["flexShrink"] = "0";
        div_row.appendChild(cell);

        const cell_class = new Cell(cell, [j, i]);
        row.push(cell_class);
        
    };
    grid_cells.push(row);
    canvas.appendChild(div_row);
};
console.log(grid_cells[0].length, grid_cells.length)
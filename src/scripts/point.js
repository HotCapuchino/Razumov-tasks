class Point {

    constructor(canvas_color, point_color) {
        this.canvas_color = canvas_color;
        this.point_color = point_color;
        this.size = 20;
        this.update();
    }   

    update() {
        let new_x = window.canvas_width * Math.random();
        let new_y = window.canvas_height * Math.random();
        this.x = Math.round(new_x - new_x % 20);
        this.y = Math.round(new_y - new_y % 20);
    }
    
    draw() {
        ctx.fillStyle = this.point_color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

export {Point}
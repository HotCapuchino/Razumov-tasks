let directions = {
    up: 'up', 
    right: 'right',
    down: 'down',
    left: 'left'
};

class Snake {
    
    constructor(canvas_color, head_color, body_color) {
        this.head_color = head_color;
        this.body_color = body_color;
        this.canvas_color = canvas_color;
        this.size = 20;
        this._create();
    }

    _create() {
        this.head = {
            x: 400,
            y: 500,
            direction: directions.right
        };
        this.body = [];
    }

    move() {
        let old_x = this.head.x;
        let old_y = this.head.y;
        switch(this.head.direction) {
            case 'up': this.head.y -= 20;
            break;
            case 'right': this.head.x += 20;
            break;
            case 'down': this.head.y += 20;
            break;
            case 'left': this.head.x -= 20;
            break;
            default: break;
        }
        if (this.body.length) {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            this.body[0].x = old_x;
            this.body[0].y = old_y;
        }
    }

    changeDirection(direction) {
        if(directions.hasOwnProperty(direction)) {
            if ((this.head.direction == directions.right && direction == 'left') 
            || (this.head.direction == direction.left && direction == 'right')) {
                return;
            }
            if ((this.head.direction == directions.up && direction == 'down')
            || (this.head.direction == directions.down && direction == 'up')) {
                return;
            }
            this.head.direction = direction;
        }
    }

    grow() {
        let new_x = null;
        let new_y = null;
        if (this.body.length < 1) {
            new_x = this.head.x;
            new_y = this.head.y;
        } else {
            switch(this.head.direction) {
                case 'up': {
                    new_x = this.body[this.body.length - 1].x;
                    new_y = this.body[this.body.length - 1].y + 20;
                }
                case 'right': {
                    new_x = this.body[this.body.length - 1].x - 20;
                    new_y = this.body[this.body.length - 1].y;
                }
                case 'down': {
                    new_x = this.body[this.body.length - 1].x;
                    new_y = this.body[this.body.length - 1].y - 20;
                }
                case 'left': {
                    new_x = this.body[this.body.length - 1].x + 20;
                    new_y = this.body[this.body.length - 1].y;
                }
                default: break;
            }
        }
        this.body.push({
            x: new_x,
            y: new_y,
        });
        for (let i = 1; i < this.body.length; i++) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
    }

    draw() {
        ctx.fillStyle = this.head_color;
        ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
        ctx.fillStyle = this.body_color;
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
        }
    }

    isDead() {
        ctx.fillStyle = this.head_color;
        for (let i = 0; i < this.body.length; i++) {
            if(this.head.x == this.body[i].x && this.head.y == this.body[i].y) {
                ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
                return true;
            }   
        }
        return false;
    }
}

export {Snake}
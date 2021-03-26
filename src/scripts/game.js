import { Point } from './point';
import { Snake } from './snake';
import { getVelocity, getDifficulty, getWallsEnabled } from './user_options';

class SnakeGame {

    constructor(color_theme) {
        this.velocity = getVelocity();
        this.difficulty = getDifficulty();
        this.enabled_walls = getWallsEnabled();
        this.color_theme = color_theme;
        this.point = new Point(
            this.color_theme.canvas_color, 
            this.color_theme.fruit_color);
        this.snake = new Snake(
            this.color_theme.canvas_color, 
            this.color_theme.snake_head_color,
            this.color_theme.snake_body_color);
        document.addEventListener('keydown', (event) => {
            switch(event.which) {
                case 38 || 87: this.snake.changeDirection('up');
                break; 
                case 39 || 68: this.snake.changeDirection('right');
                break;
                case 40 || 83: this.snake.changeDirection('down');
                break; 
                case 37 || 65: this.snake.changeDirection('left');
                break; 
                default: break;
            }
        });
        this.username_points = 0;
    }

    start() {
        this.game_interval = setInterval(() => {
            window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
            this.point.draw();
            this.snake.move();
            if (this.snake.isDead()) {
                this.end();
            }
            if (!this.enabled_walls) {
                if (this.snake.head.x > window.canvas.width) {
                    this.snake.head.x = 0;
                } 
                if (this.snake.head.x < 0) {
                    this.snake.head.x = window.canvas.width - 20;
                }
                if (this.snake.head.y > window.canvas.height) {
                    this.snake.head.y = 0;
                } 
                if (this.snake.head.y < 0) {
                    this.snake.head.y = window.canvas.height - 20;
                }
            } else {
                if (this.snake.head.x > window.canvas.width ||
                    this.snake.head.x < 0 ||
                    this.snake.head.y > window.canvas.height ||
                    this.snake.head.y < 0) {
                        this.end();
                }
            }
            this.snake.draw();
            if (this.snake.head.x == this.point.x 
                && this.snake.head.y == this.point.y) {
                this.snake.grow();
                this.point.update();
                let need_to_regenerate = true;
                outro:while (need_to_regenerate) {
                    for (let i = 0; i < this.snake.body.length; i++) {
                        if (this.snake.body[i].x == this.point.x && 
                            this.snake.body[i].y == this.point.y) {
                                continue outro;
                            }
                    }
                    if (this.snake.head.x == this.point.x &&
                        this.snake.head.y == this.point.y) {
                            continue outro;
                        }
                    need_to_regenerate = false;
                }
                this.username_points++;
            }
        }, this.velocity);
    }

    end() {
        clearInterval(this.game_interval);
        this.showResults();
    }

    showResults() {
        document.querySelector('.results').classList.remove('none');
        let total_score = 0;
        switch(this.difficulty) {
            case 'easy': total_score += this.username_points * 30;
            break;
            case 'medium': total_score += this.username_points * 50;
            break;
            case 'hard': total_score += this.username_points * 70;
            break;
            case 'extreme': total_score += this.username_points * 100;
            default: total_score += this.username_points * 30;
        }
        document.getElementById('score').textContent = total_score;
    }

}

export {SnakeGame};
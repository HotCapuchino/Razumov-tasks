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
        this.close_game_event = new Event('close_game');
        this.user_died_event = new Event('user_died');
        document.addEventListener('keydown', (event) => {
            let pressed_key = event.key;
            switch(true) {
                case pressed_key == 'ArrowUp' ||  pressed_key == 'w': this.snake.changeDirection('up');
                break; 
                case pressed_key == 'ArrowRight' || pressed_key == 'd': this.snake.changeDirection('right');
                break;
                case pressed_key == 'ArrowDown' || pressed_key == 's': this.snake.changeDirection('down');
                break; 
                case pressed_key == 'ArrowLeft' || pressed_key == 'a': this.snake.changeDirection('left');
                break; 
                case pressed_key == 'Escape': {
                    document.dispatchEvent(this.close_game_event);
                }
                default: break;
            }
        });
        document.addEventListener('close_game', () => {
            this._end();
            window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
            document.querySelector('.start-menu').classList.remove('none');
        });
        document.addEventListener('user_died', () => {
            this._end(); 
            this.showResults(); 
        });
        this.username_points = 0;
    }

    start() {
        this.game_interval = setInterval(() => {
            window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
            this.point.draw();
            this.snake.move();
            if (this.snake.isDead()) {
                document.dispatchEvent(this.user_died_event);
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
                    document.dispatchEvent(this.user_died_event);
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

    _end() {
        clearInterval(this.game_interval);
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
import {SnakeGame}  from './game';
import {defineUserOptions, getColorTheme} from './user_options';
// getting all the nessecary elements of the page
let options_block = document.querySelector('.start-menu');
let restart_block = document.querySelector('.results');
let play_button = document.getElementById('start-game');
let restart_button = document.getElementById('restart');
let snake_game = null;
window.canvas_width = 1000;
window.canvas_height = 800;
let canvas = document.getElementById('canvas');
window.canvas = canvas;
window.ctx = canvas.getContext('2d'); 

play_button.addEventListener('click', function() {
    let difficulty_level = document.getElementById('difficulty').value;
    let walls_enabled = document.getElementById('walls-enabling').checked;
    let color_theme = document.getElementById('color-theme').value;
    defineUserOptions(difficulty_level, walls_enabled, color_theme);
    options_block.classList.add('none');
    let picked_color_theme = getColorTheme();
    canvas.style.backgroundColor = picked_color_theme.canvas_color;
    canvas.style.borderColor = picked_color_theme.canvas_borders_color;
    snake_game = new SnakeGame(picked_color_theme);
    snake_game.start();
});

restart_button.addEventListener('click', function() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    options_block.classList.remove('none');
    restart_block.classList.add('none');
});


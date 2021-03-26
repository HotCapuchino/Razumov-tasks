const COLOR_THEMES = {
    default: {
        fruit_color: '#f0f0f0',
        snake_head_color: '#ada8a8',
        snake_body_color: '#6e6b6b',
        canvas_color: '#141414',
        canvas_borders_color: '#f0f0f0'
    },
    cyberpunky: {
        fruit_color: '#51c3de',
        snake_head_color: '#fffc01',
        snake_body_color: '#eae100',
        canvas_color: '#141414',
        canvas_borders_color: '#eae100'
    },
    synthwave: {
        fruit_color: '#a7154f',
        snake_head_color: '#eb1b48',
        snake_body_color: '#f6a31b',
        canvas_color: '#421441',
        canvas_borders_color: '#48193f'
    },
    hacker: {
        fruit_color: '#32c6d3',
        snake_head_color: '#61fd4b',
        snake_body_color: '#014500',
        canvas_color: '#000',
        canvas_borders_color: '#0e2a35'
    }, 
    vomit: {
        fruit_color: '#ff0000',
        snake_head_color: '#ada8a8',
        snake_body_color: '#004000',
        canvas_color: '#5a4f00',
        canvas_borders_color: '#f0f0f0'
    }
};

const USER_OPTIONS = {
    velocity: 400,
    difficulty: 'easy',
    enable_walls: true,
    color_theme: COLOR_THEMES.default
};

function defineUserOptions(difficulty, enable_walls, color_theme) {
    switch(difficulty) {
        case 'easy': {
            USER_OPTIONS.velocity = 250;
            USER_OPTIONS.difficulty = 'easy';
        }
        break;
        case 'medium': { 
            USER_OPTIONS.velocity = 125;
            USER_OPTIONS.difficulty = 'medium';
        }
        break;
        case 'hard': { 
            USER_OPTIONS.velocity = 50;
            USER_OPTIONS.difficulty = 'hard';
        }
        break;
        case 'extreme': {
             USER_OPTIONS.velocity = 25;
             USER_OPTIONS.difficulty = 'extreme';
        }
        break;
        default:  {
            USER_OPTIONS.velocity = 250;
            USER_OPTIONS.difficulty = 'easy'; 
        }
    }
    USER_OPTIONS.enable_walls = enable_walls;
    if (!COLOR_THEMES[color_theme]) {
        USER_OPTIONS.color_theme = COLOR_THEMES.default;
    } else {
        USER_OPTIONS.color_theme = COLOR_THEMES[color_theme];
    }
}

function getVelocity() {
    return USER_OPTIONS.velocity;
}

function getDifficulty() {
    return USER_OPTIONS.difficulty;
}

function getWallsEnabled() {
    return USER_OPTIONS.enable_walls;
}

function getColorTheme() {
    return USER_OPTIONS.color_theme;
}

export { defineUserOptions, getVelocity, getDifficulty, getWallsEnabled, getColorTheme }
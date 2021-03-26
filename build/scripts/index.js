(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnakeGame = void 0;

var _point = require("./point");

var _snake = require("./snake");

var _user_options = require("./user_options");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SnakeGame = /*#__PURE__*/function () {
  function SnakeGame(color_theme) {
    var _this = this;

    _classCallCheck(this, SnakeGame);

    this.velocity = (0, _user_options.getVelocity)();
    this.difficulty = (0, _user_options.getDifficulty)();
    this.enabled_walls = (0, _user_options.getWallsEnabled)();
    this.color_theme = color_theme;
    this.point = new _point.Point(this.color_theme.canvas_color, this.color_theme.fruit_color);
    this.snake = new _snake.Snake(this.color_theme.canvas_color, this.color_theme.snake_head_color, this.color_theme.snake_body_color);
    this.close_game_event = new Event('close_game');
    this.user_died_event = new Event('user_died');
    document.addEventListener('keydown', function (event) {
      var pressed_key = event.key;

      switch (true) {
        case pressed_key == 'ArrowUp' || pressed_key == 'w':
          _this.snake.changeDirection('up');

          break;

        case pressed_key == 'ArrowRight' || pressed_key == 'd':
          _this.snake.changeDirection('right');

          break;

        case pressed_key == 'ArrowDown' || pressed_key == 's':
          _this.snake.changeDirection('down');

          break;

        case pressed_key == 'ArrowLeft' || pressed_key == 'a':
          _this.snake.changeDirection('left');

          break;

        case pressed_key == 'Escape':
          {
            document.dispatchEvent(_this.close_game_event);
          }

        default:
          break;
      }
    });
    document.addEventListener('close_game', function () {
      _this._end();

      window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
      document.querySelector('.start-menu').classList.remove('none');
    });
    document.addEventListener('user_died', function () {
      _this._end();

      _this.showResults();
    });
    this.username_points = 0;
  }

  _createClass(SnakeGame, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.game_interval = setInterval(function () {
        window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

        _this2.point.draw();

        _this2.snake.move();

        if (_this2.snake.isDead()) {
          document.dispatchEvent(_this2.user_died_event);
        }

        if (!_this2.enabled_walls) {
          if (_this2.snake.head.x > window.canvas.width) {
            _this2.snake.head.x = 0;
          }

          if (_this2.snake.head.x < 0) {
            _this2.snake.head.x = window.canvas.width - 20;
          }

          if (_this2.snake.head.y > window.canvas.height) {
            _this2.snake.head.y = 0;
          }

          if (_this2.snake.head.y < 0) {
            _this2.snake.head.y = window.canvas.height - 20;
          }
        } else {
          if (_this2.snake.head.x > window.canvas.width || _this2.snake.head.x < 0 || _this2.snake.head.y > window.canvas.height || _this2.snake.head.y < 0) {
            document.dispatchEvent(_this2.user_died_event);
          }
        }

        _this2.snake.draw();

        if (_this2.snake.head.x == _this2.point.x && _this2.snake.head.y == _this2.point.y) {
          _this2.snake.grow();

          _this2.point.update();

          var need_to_regenerate = true;

          outro: while (need_to_regenerate) {
            for (var i = 0; i < _this2.snake.body.length; i++) {
              if (_this2.snake.body[i].x == _this2.point.x && _this2.snake.body[i].y == _this2.point.y) {
                continue outro;
              }
            }

            if (_this2.snake.head.x == _this2.point.x && _this2.snake.head.y == _this2.point.y) {
              continue outro;
            }

            need_to_regenerate = false;
          }

          _this2.username_points++;
        }
      }, this.velocity);
    }
  }, {
    key: "_end",
    value: function _end() {
      clearInterval(this.game_interval);
    }
  }, {
    key: "showResults",
    value: function showResults() {
      document.querySelector('.results').classList.remove('none');
      var total_score = 0;

      switch (this.difficulty) {
        case 'easy':
          total_score += this.username_points * 30;
          break;

        case 'medium':
          total_score += this.username_points * 50;
          break;

        case 'hard':
          total_score += this.username_points * 70;
          break;

        case 'extreme':
          total_score += this.username_points * 100;

        default:
          total_score += this.username_points * 30;
      }

      document.getElementById('score').textContent = total_score;
    }
  }]);

  return SnakeGame;
}();

exports.SnakeGame = SnakeGame;

},{"./point":3,"./snake":4,"./user_options":5}],2:[function(require,module,exports){
"use strict";

var _game = require("./game");

var _user_options = require("./user_options");

// getting all the nessecary elements of the page
var options_block = document.querySelector('.start-menu');
var restart_block = document.querySelector('.results');
var play_button = document.getElementById('start-game');
var restart_button = document.getElementById('restart');
var snake_game = null;
window.canvas_width = 1000;
window.canvas_height = 800;
var canvas = document.getElementById('canvas');
window.canvas = canvas;
window.ctx = canvas.getContext('2d');
play_button.addEventListener('click', function () {
  var difficulty_level = document.getElementById('difficulty').value;
  var walls_enabled = document.getElementById('walls-enabling').checked;
  var color_theme = document.getElementById('color-theme').value;
  (0, _user_options.defineUserOptions)(difficulty_level, walls_enabled, color_theme);
  options_block.classList.add('none');
  var picked_color_theme = (0, _user_options.getColorTheme)();
  canvas.style.backgroundColor = picked_color_theme.canvas_color;
  canvas.style.borderColor = picked_color_theme.canvas_borders_color;
  snake_game = new _game.SnakeGame(picked_color_theme);
  snake_game.start();
});
restart_button.addEventListener('click', function () {
  window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
  options_block.classList.remove('none');
  restart_block.classList.add('none');
});

},{"./game":1,"./user_options":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(canvas_color, point_color) {
    _classCallCheck(this, Point);

    this.canvas_color = canvas_color;
    this.point_color = point_color;
    this.size = 20;
    this.update();
  }

  _createClass(Point, [{
    key: "update",
    value: function update() {
      var new_x = window.canvas_width * Math.random();
      var new_y = window.canvas_height * Math.random();
      this.x = Math.round(new_x - new_x % 20);
      this.y = Math.round(new_y - new_y % 20);
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.point_color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }]);

  return Point;
}();

exports.Point = Point;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var directions = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left'
};

var Snake = /*#__PURE__*/function () {
  function Snake(canvas_color, head_color, body_color) {
    _classCallCheck(this, Snake);

    this.head_color = head_color;
    this.body_color = body_color;
    this.canvas_color = canvas_color;
    this.size = 20;

    this._create();
  }

  _createClass(Snake, [{
    key: "_create",
    value: function _create() {
      this.head = {
        x: 400,
        y: 500,
        direction: directions.right
      };
      this.body = [];
    }
  }, {
    key: "move",
    value: function move() {
      var old_x = this.head.x;
      var old_y = this.head.y;

      switch (this.head.direction) {
        case 'up':
          this.head.y -= 20;
          break;

        case 'right':
          this.head.x += 20;
          break;

        case 'down':
          this.head.y += 20;
          break;

        case 'left':
          this.head.x -= 20;
          break;

        default:
          break;
      }

      if (this.body.length) {
        for (var i = this.body.length - 1; i > 0; i--) {
          this.body[i].x = this.body[i - 1].x;
          this.body[i].y = this.body[i - 1].y;
        }

        this.body[0].x = old_x;
        this.body[0].y = old_y;
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(direction) {
      if (directions.hasOwnProperty(direction)) {
        if (this.head.direction === 'left' && direction === 'right' || this.head.direction === 'right' && direction === 'left') {
          return;
        }

        if (this.head.direction === 'up' && direction === 'down' || this.head.direction === 'down' && direction === 'up') {
          return;
        }

        this.head.direction = direction;
      }
    }
  }, {
    key: "grow",
    value: function grow() {
      var new_x = null;
      var new_y = null;

      if (this.body.length < 1) {
        new_x = this.head.x;
        new_y = this.head.y;
      } else {
        switch (this.head.direction) {
          case 'up':
            {
              new_x = this.body[this.body.length - 1].x;
              new_y = this.body[this.body.length - 1].y + 20;
            }

          case 'right':
            {
              new_x = this.body[this.body.length - 1].x - 20;
              new_y = this.body[this.body.length - 1].y;
            }

          case 'down':
            {
              new_x = this.body[this.body.length - 1].x;
              new_y = this.body[this.body.length - 1].y - 20;
            }

          case 'left':
            {
              new_x = this.body[this.body.length - 1].x + 20;
              new_y = this.body[this.body.length - 1].y;
            }

          default:
            break;
        }
      }

      this.body.push({
        x: new_x,
        y: new_y
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.head_color;
      ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
      ctx.fillStyle = this.body_color;

      for (var i = 0; i < this.body.length; i++) {
        ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
      }
    }
  }, {
    key: "isDead",
    value: function isDead() {
      ctx.fillStyle = this.head_color;

      for (var i = 0; i < this.body.length; i++) {
        if (this.head.x == this.body[i].x && this.head.y == this.body[i].y) {
          ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
          return true;
        }
      }

      return false;
    }
  }]);

  return Snake;
}();

exports.Snake = Snake;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineUserOptions = defineUserOptions;
exports.getVelocity = getVelocity;
exports.getDifficulty = getDifficulty;
exports.getWallsEnabled = getWallsEnabled;
exports.getColorTheme = getColorTheme;
var COLOR_THEMES = {
  "default": {
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
var USER_OPTIONS = {
  velocity: 400,
  difficulty: 'easy',
  enable_walls: true,
  color_theme: COLOR_THEMES["default"]
};

function defineUserOptions(difficulty, enable_walls, color_theme) {
  switch (difficulty) {
    case 'easy':
      {
        USER_OPTIONS.velocity = 250;
        USER_OPTIONS.difficulty = 'easy';
      }
      break;

    case 'medium':
      {
        USER_OPTIONS.velocity = 125;
        USER_OPTIONS.difficulty = 'medium';
      }
      break;

    case 'hard':
      {
        USER_OPTIONS.velocity = 50;
        USER_OPTIONS.difficulty = 'hard';
      }
      break;

    case 'extreme':
      {
        USER_OPTIONS.velocity = 25;
        USER_OPTIONS.difficulty = 'extreme';
      }
      break;

    default:
      {
        USER_OPTIONS.velocity = 250;
        USER_OPTIONS.difficulty = 'easy';
      }
  }

  USER_OPTIONS.enable_walls = enable_walls;

  if (!COLOR_THEMES[color_theme]) {
    USER_OPTIONS.color_theme = COLOR_THEMES["default"];
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

},{}]},{},[2]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TbmFrZUdhbWUgPSB2b2lkIDA7XG5cbnZhciBfcG9pbnQgPSByZXF1aXJlKFwiLi9wb2ludFwiKTtcblxudmFyIF9zbmFrZSA9IHJlcXVpcmUoXCIuL3NuYWtlXCIpO1xuXG52YXIgX3VzZXJfb3B0aW9ucyA9IHJlcXVpcmUoXCIuL3VzZXJfb3B0aW9uc1wiKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG52YXIgU25ha2VHYW1lID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU25ha2VHYW1lKGNvbG9yX3RoZW1lKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTbmFrZUdhbWUpO1xuXG4gICAgdGhpcy52ZWxvY2l0eSA9ICgwLCBfdXNlcl9vcHRpb25zLmdldFZlbG9jaXR5KSgpO1xuICAgIHRoaXMuZGlmZmljdWx0eSA9ICgwLCBfdXNlcl9vcHRpb25zLmdldERpZmZpY3VsdHkpKCk7XG4gICAgdGhpcy5lbmFibGVkX3dhbGxzID0gKDAsIF91c2VyX29wdGlvbnMuZ2V0V2FsbHNFbmFibGVkKSgpO1xuICAgIHRoaXMuY29sb3JfdGhlbWUgPSBjb2xvcl90aGVtZTtcbiAgICB0aGlzLnBvaW50ID0gbmV3IF9wb2ludC5Qb2ludCh0aGlzLmNvbG9yX3RoZW1lLmNhbnZhc19jb2xvciwgdGhpcy5jb2xvcl90aGVtZS5mcnVpdF9jb2xvcik7XG4gICAgdGhpcy5zbmFrZSA9IG5ldyBfc25ha2UuU25ha2UodGhpcy5jb2xvcl90aGVtZS5jYW52YXNfY29sb3IsIHRoaXMuY29sb3JfdGhlbWUuc25ha2VfaGVhZF9jb2xvciwgdGhpcy5jb2xvcl90aGVtZS5zbmFrZV9ib2R5X2NvbG9yKTtcbiAgICB0aGlzLmNsb3NlX2dhbWVfZXZlbnQgPSBuZXcgRXZlbnQoJ2Nsb3NlX2dhbWUnKTtcbiAgICB0aGlzLnVzZXJfZGllZF9ldmVudCA9IG5ldyBFdmVudCgndXNlcl9kaWVkJyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIHByZXNzZWRfa2V5ID0gZXZlbnQua2V5O1xuXG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBwcmVzc2VkX2tleSA9PSAnQXJyb3dVcCcgfHwgcHJlc3NlZF9rZXkgPT0gJ3cnOlxuICAgICAgICAgIF90aGlzLnNuYWtlLmNoYW5nZURpcmVjdGlvbigndXAnKTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcHJlc3NlZF9rZXkgPT0gJ0Fycm93UmlnaHQnIHx8IHByZXNzZWRfa2V5ID09ICdkJzpcbiAgICAgICAgICBfdGhpcy5zbmFrZS5jaGFuZ2VEaXJlY3Rpb24oJ3JpZ2h0Jyk7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIHByZXNzZWRfa2V5ID09ICdBcnJvd0Rvd24nIHx8IHByZXNzZWRfa2V5ID09ICdzJzpcbiAgICAgICAgICBfdGhpcy5zbmFrZS5jaGFuZ2VEaXJlY3Rpb24oJ2Rvd24nKTtcblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgcHJlc3NlZF9rZXkgPT0gJ0Fycm93TGVmdCcgfHwgcHJlc3NlZF9rZXkgPT0gJ2EnOlxuICAgICAgICAgIF90aGlzLnNuYWtlLmNoYW5nZURpcmVjdGlvbignbGVmdCcpO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBwcmVzc2VkX2tleSA9PSAnRXNjYXBlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KF90aGlzLmNsb3NlX2dhbWVfZXZlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlX2dhbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5fZW5kKCk7XG5cbiAgICAgIHdpbmRvdy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5jYW52YXMud2lkdGgsIHdpbmRvdy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3VzZXJfZGllZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLl9lbmQoKTtcblxuICAgICAgX3RoaXMuc2hvd1Jlc3VsdHMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnVzZXJuYW1lX3BvaW50cyA9IDA7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU25ha2VHYW1lLCBbe1xuICAgIGtleTogXCJzdGFydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLmdhbWVfaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5jYW52YXMud2lkdGgsIHdpbmRvdy5jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICBfdGhpczIucG9pbnQuZHJhdygpO1xuXG4gICAgICAgIF90aGlzMi5zbmFrZS5tb3ZlKCk7XG5cbiAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5pc0RlYWQoKSkge1xuICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoX3RoaXMyLnVzZXJfZGllZF9ldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV90aGlzMi5lbmFibGVkX3dhbGxzKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5oZWFkLnggPiB3aW5kb3cuY2FudmFzLndpZHRoKSB7XG4gICAgICAgICAgICBfdGhpczIuc25ha2UuaGVhZC54ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3RoaXMyLnNuYWtlLmhlYWQueCA8IDApIHtcbiAgICAgICAgICAgIF90aGlzMi5zbmFrZS5oZWFkLnggPSB3aW5kb3cuY2FudmFzLndpZHRoIC0gMjA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5oZWFkLnkgPiB3aW5kb3cuY2FudmFzLmhlaWdodCkge1xuICAgICAgICAgICAgX3RoaXMyLnNuYWtlLmhlYWQueSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5oZWFkLnkgPCAwKSB7XG4gICAgICAgICAgICBfdGhpczIuc25ha2UuaGVhZC55ID0gd2luZG93LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5oZWFkLnggPiB3aW5kb3cuY2FudmFzLndpZHRoIHx8IF90aGlzMi5zbmFrZS5oZWFkLnggPCAwIHx8IF90aGlzMi5zbmFrZS5oZWFkLnkgPiB3aW5kb3cuY2FudmFzLmhlaWdodCB8fCBfdGhpczIuc25ha2UuaGVhZC55IDwgMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChfdGhpczIudXNlcl9kaWVkX2V2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIuc25ha2UuZHJhdygpO1xuXG4gICAgICAgIGlmIChfdGhpczIuc25ha2UuaGVhZC54ID09IF90aGlzMi5wb2ludC54ICYmIF90aGlzMi5zbmFrZS5oZWFkLnkgPT0gX3RoaXMyLnBvaW50LnkpIHtcbiAgICAgICAgICBfdGhpczIuc25ha2UuZ3JvdygpO1xuXG4gICAgICAgICAgX3RoaXMyLnBvaW50LnVwZGF0ZSgpO1xuXG4gICAgICAgICAgdmFyIG5lZWRfdG9fcmVnZW5lcmF0ZSA9IHRydWU7XG5cbiAgICAgICAgICBvdXRybzogd2hpbGUgKG5lZWRfdG9fcmVnZW5lcmF0ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfdGhpczIuc25ha2UuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMyLnNuYWtlLmJvZHlbaV0ueCA9PSBfdGhpczIucG9pbnQueCAmJiBfdGhpczIuc25ha2UuYm9keVtpXS55ID09IF90aGlzMi5wb2ludC55KSB7XG4gICAgICAgICAgICAgICAgY29udGludWUgb3V0cm87XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF90aGlzMi5zbmFrZS5oZWFkLnggPT0gX3RoaXMyLnBvaW50LnggJiYgX3RoaXMyLnNuYWtlLmhlYWQueSA9PSBfdGhpczIucG9pbnQueSkge1xuICAgICAgICAgICAgICBjb250aW51ZSBvdXRybztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmVlZF90b19yZWdlbmVyYXRlID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMyLnVzZXJuYW1lX3BvaW50cysrO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLnZlbG9jaXR5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZW5kKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVfaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaG93UmVzdWx0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93UmVzdWx0cygpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzJykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgdmFyIHRvdGFsX3Njb3JlID0gMDtcblxuICAgICAgc3dpdGNoICh0aGlzLmRpZmZpY3VsdHkpIHtcbiAgICAgICAgY2FzZSAnZWFzeSc6XG4gICAgICAgICAgdG90YWxfc2NvcmUgKz0gdGhpcy51c2VybmFtZV9wb2ludHMgKiAzMDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdtZWRpdW0nOlxuICAgICAgICAgIHRvdGFsX3Njb3JlICs9IHRoaXMudXNlcm5hbWVfcG9pbnRzICogNTA7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaGFyZCc6XG4gICAgICAgICAgdG90YWxfc2NvcmUgKz0gdGhpcy51c2VybmFtZV9wb2ludHMgKiA3MDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdleHRyZW1lJzpcbiAgICAgICAgICB0b3RhbF9zY29yZSArPSB0aGlzLnVzZXJuYW1lX3BvaW50cyAqIDEwMDtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRvdGFsX3Njb3JlICs9IHRoaXMudXNlcm5hbWVfcG9pbnRzICogMzA7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpLnRleHRDb250ZW50ID0gdG90YWxfc2NvcmU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNuYWtlR2FtZTtcbn0oKTtcblxuZXhwb3J0cy5TbmFrZUdhbWUgPSBTbmFrZUdhbWU7XG5cbn0se1wiLi9wb2ludFwiOjMsXCIuL3NuYWtlXCI6NCxcIi4vdXNlcl9vcHRpb25zXCI6NX1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2FtZSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XG5cbnZhciBfdXNlcl9vcHRpb25zID0gcmVxdWlyZShcIi4vdXNlcl9vcHRpb25zXCIpO1xuXG4vLyBnZXR0aW5nIGFsbCB0aGUgbmVzc2VjYXJ5IGVsZW1lbnRzIG9mIHRoZSBwYWdlXG52YXIgb3B0aW9uc19ibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1tZW51Jyk7XG52YXIgcmVzdGFydF9ibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzJyk7XG52YXIgcGxheV9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtZ2FtZScpO1xudmFyIHJlc3RhcnRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQnKTtcbnZhciBzbmFrZV9nYW1lID0gbnVsbDtcbndpbmRvdy5jYW52YXNfd2lkdGggPSAxMDAwO1xud2luZG93LmNhbnZhc19oZWlnaHQgPSA4MDA7XG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xud2luZG93LmNhbnZhcyA9IGNhbnZhcztcbndpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbnBsYXlfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgZGlmZmljdWx0eV9sZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWZmaWN1bHR5JykudmFsdWU7XG4gIHZhciB3YWxsc19lbmFibGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhbGxzLWVuYWJsaW5nJykuY2hlY2tlZDtcbiAgdmFyIGNvbG9yX3RoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXRoZW1lJykudmFsdWU7XG4gICgwLCBfdXNlcl9vcHRpb25zLmRlZmluZVVzZXJPcHRpb25zKShkaWZmaWN1bHR5X2xldmVsLCB3YWxsc19lbmFibGVkLCBjb2xvcl90aGVtZSk7XG4gIG9wdGlvbnNfYmxvY2suY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICB2YXIgcGlja2VkX2NvbG9yX3RoZW1lID0gKDAsIF91c2VyX29wdGlvbnMuZ2V0Q29sb3JUaGVtZSkoKTtcbiAgY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBpY2tlZF9jb2xvcl90aGVtZS5jYW52YXNfY29sb3I7XG4gIGNhbnZhcy5zdHlsZS5ib3JkZXJDb2xvciA9IHBpY2tlZF9jb2xvcl90aGVtZS5jYW52YXNfYm9yZGVyc19jb2xvcjtcbiAgc25ha2VfZ2FtZSA9IG5ldyBfZ2FtZS5TbmFrZUdhbWUocGlja2VkX2NvbG9yX3RoZW1lKTtcbiAgc25ha2VfZ2FtZS5zdGFydCgpO1xufSk7XG5yZXN0YXJ0X2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgd2luZG93LmN0eC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmNhbnZhcy53aWR0aCwgd2luZG93LmNhbnZhcy5oZWlnaHQpO1xuICBvcHRpb25zX2Jsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgcmVzdGFydF9ibG9jay5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG59KTtcblxufSx7XCIuL2dhbWVcIjoxLFwiLi91c2VyX29wdGlvbnNcIjo1fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUG9pbnQgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFBvaW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUG9pbnQoY2FudmFzX2NvbG9yLCBwb2ludF9jb2xvcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb2ludCk7XG5cbiAgICB0aGlzLmNhbnZhc19jb2xvciA9IGNhbnZhc19jb2xvcjtcbiAgICB0aGlzLnBvaW50X2NvbG9yID0gcG9pbnRfY29sb3I7XG4gICAgdGhpcy5zaXplID0gMjA7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQb2ludCwgW3tcbiAgICBrZXk6IFwidXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBuZXdfeCA9IHdpbmRvdy5jYW52YXNfd2lkdGggKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgdmFyIG5ld195ID0gd2luZG93LmNhbnZhc19oZWlnaHQgKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgdGhpcy54ID0gTWF0aC5yb3VuZChuZXdfeCAtIG5ld194ICUgMjApO1xuICAgICAgdGhpcy55ID0gTWF0aC5yb3VuZChuZXdfeSAtIG5ld195ICUgMjApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmF3XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wb2ludF9jb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb2ludDtcbn0oKTtcblxuZXhwb3J0cy5Qb2ludCA9IFBvaW50O1xuXG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TbmFrZSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG52YXIgZGlyZWN0aW9ucyA9IHtcbiAgdXA6ICd1cCcsXG4gIHJpZ2h0OiAncmlnaHQnLFxuICBkb3duOiAnZG93bicsXG4gIGxlZnQ6ICdsZWZ0J1xufTtcblxudmFyIFNuYWtlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU25ha2UoY2FudmFzX2NvbG9yLCBoZWFkX2NvbG9yLCBib2R5X2NvbG9yKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNuYWtlKTtcblxuICAgIHRoaXMuaGVhZF9jb2xvciA9IGhlYWRfY29sb3I7XG4gICAgdGhpcy5ib2R5X2NvbG9yID0gYm9keV9jb2xvcjtcbiAgICB0aGlzLmNhbnZhc19jb2xvciA9IGNhbnZhc19jb2xvcjtcbiAgICB0aGlzLnNpemUgPSAyMDtcblxuICAgIHRoaXMuX2NyZWF0ZSgpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNuYWtlLCBbe1xuICAgIGtleTogXCJfY3JlYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGUoKSB7XG4gICAgICB0aGlzLmhlYWQgPSB7XG4gICAgICAgIHg6IDQwMCxcbiAgICAgICAgeTogNTAwLFxuICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbnMucmlnaHRcbiAgICAgIH07XG4gICAgICB0aGlzLmJvZHkgPSBbXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKCkge1xuICAgICAgdmFyIG9sZF94ID0gdGhpcy5oZWFkLng7XG4gICAgICB2YXIgb2xkX3kgPSB0aGlzLmhlYWQueTtcblxuICAgICAgc3dpdGNoICh0aGlzLmhlYWQuZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICB0aGlzLmhlYWQueSAtPSAyMDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5oZWFkLnggKz0gMjA7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgdGhpcy5oZWFkLnkgKz0gMjA7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5oZWFkLnggLT0gMjA7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYm9keS5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuYm9keS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5ib2R5W2ldLnggPSB0aGlzLmJvZHlbaSAtIDFdLng7XG4gICAgICAgICAgdGhpcy5ib2R5W2ldLnkgPSB0aGlzLmJvZHlbaSAtIDFdLnk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvZHlbMF0ueCA9IG9sZF94O1xuICAgICAgICB0aGlzLmJvZHlbMF0ueSA9IG9sZF95O1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjaGFuZ2VEaXJlY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgaWYgKGRpcmVjdGlvbnMuaGFzT3duUHJvcGVydHkoZGlyZWN0aW9uKSkge1xuICAgICAgICBpZiAodGhpcy5oZWFkLmRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCB0aGlzLmhlYWQuZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZC5kaXJlY3Rpb24gPT09ICd1cCcgJiYgZGlyZWN0aW9uID09PSAnZG93bicgfHwgdGhpcy5oZWFkLmRpcmVjdGlvbiA9PT0gJ2Rvd24nICYmIGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVhZC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdygpIHtcbiAgICAgIHZhciBuZXdfeCA9IG51bGw7XG4gICAgICB2YXIgbmV3X3kgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5ib2R5Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgbmV3X3ggPSB0aGlzLmhlYWQueDtcbiAgICAgICAgbmV3X3kgPSB0aGlzLmhlYWQueTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5oZWFkLmRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmV3X3ggPSB0aGlzLmJvZHlbdGhpcy5ib2R5Lmxlbmd0aCAtIDFdLng7XG4gICAgICAgICAgICAgIG5ld195ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS55ICsgMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5ld194ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS54IC0gMjA7XG4gICAgICAgICAgICAgIG5ld195ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5ld194ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS54O1xuICAgICAgICAgICAgICBuZXdfeSA9IHRoaXMuYm9keVt0aGlzLmJvZHkubGVuZ3RoIC0gMV0ueSAtIDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5ld194ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS54ICsgMjA7XG4gICAgICAgICAgICAgIG5ld195ID0gdGhpcy5ib2R5W3RoaXMuYm9keS5sZW5ndGggLSAxXS55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYm9keS5wdXNoKHtcbiAgICAgICAgeDogbmV3X3gsXG4gICAgICAgIHk6IG5ld195XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHJhd1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuaGVhZF9jb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmhlYWQueCwgdGhpcy5oZWFkLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJvZHlfY29sb3I7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmJvZHlbaV0ueCwgdGhpcy5ib2R5W2ldLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNEZWFkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRGVhZCgpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmhlYWRfY29sb3I7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmhlYWQueCA9PSB0aGlzLmJvZHlbaV0ueCAmJiB0aGlzLmhlYWQueSA9PSB0aGlzLmJvZHlbaV0ueSkge1xuICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmhlYWQueCwgdGhpcy5oZWFkLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNuYWtlO1xufSgpO1xuXG5leHBvcnRzLlNuYWtlID0gU25ha2U7XG5cbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmluZVVzZXJPcHRpb25zID0gZGVmaW5lVXNlck9wdGlvbnM7XG5leHBvcnRzLmdldFZlbG9jaXR5ID0gZ2V0VmVsb2NpdHk7XG5leHBvcnRzLmdldERpZmZpY3VsdHkgPSBnZXREaWZmaWN1bHR5O1xuZXhwb3J0cy5nZXRXYWxsc0VuYWJsZWQgPSBnZXRXYWxsc0VuYWJsZWQ7XG5leHBvcnRzLmdldENvbG9yVGhlbWUgPSBnZXRDb2xvclRoZW1lO1xudmFyIENPTE9SX1RIRU1FUyA9IHtcbiAgXCJkZWZhdWx0XCI6IHtcbiAgICBmcnVpdF9jb2xvcjogJyNmMGYwZjAnLFxuICAgIHNuYWtlX2hlYWRfY29sb3I6ICcjYWRhOGE4JyxcbiAgICBzbmFrZV9ib2R5X2NvbG9yOiAnIzZlNmI2YicsXG4gICAgY2FudmFzX2NvbG9yOiAnIzE0MTQxNCcsXG4gICAgY2FudmFzX2JvcmRlcnNfY29sb3I6ICcjZjBmMGYwJ1xuICB9LFxuICBjeWJlcnB1bmt5OiB7XG4gICAgZnJ1aXRfY29sb3I6ICcjNTFjM2RlJyxcbiAgICBzbmFrZV9oZWFkX2NvbG9yOiAnI2ZmZmMwMScsXG4gICAgc25ha2VfYm9keV9jb2xvcjogJyNlYWUxMDAnLFxuICAgIGNhbnZhc19jb2xvcjogJyMxNDE0MTQnLFxuICAgIGNhbnZhc19ib3JkZXJzX2NvbG9yOiAnI2VhZTEwMCdcbiAgfSxcbiAgc3ludGh3YXZlOiB7XG4gICAgZnJ1aXRfY29sb3I6ICcjYTcxNTRmJyxcbiAgICBzbmFrZV9oZWFkX2NvbG9yOiAnI2ViMWI0OCcsXG4gICAgc25ha2VfYm9keV9jb2xvcjogJyNmNmEzMWInLFxuICAgIGNhbnZhc19jb2xvcjogJyM0MjE0NDEnLFxuICAgIGNhbnZhc19ib3JkZXJzX2NvbG9yOiAnIzQ4MTkzZidcbiAgfSxcbiAgaGFja2VyOiB7XG4gICAgZnJ1aXRfY29sb3I6ICcjMzJjNmQzJyxcbiAgICBzbmFrZV9oZWFkX2NvbG9yOiAnIzYxZmQ0YicsXG4gICAgc25ha2VfYm9keV9jb2xvcjogJyMwMTQ1MDAnLFxuICAgIGNhbnZhc19jb2xvcjogJyMwMDAnLFxuICAgIGNhbnZhc19ib3JkZXJzX2NvbG9yOiAnIzBlMmEzNSdcbiAgfSxcbiAgdm9taXQ6IHtcbiAgICBmcnVpdF9jb2xvcjogJyNmZjAwMDAnLFxuICAgIHNuYWtlX2hlYWRfY29sb3I6ICcjYWRhOGE4JyxcbiAgICBzbmFrZV9ib2R5X2NvbG9yOiAnIzAwNDAwMCcsXG4gICAgY2FudmFzX2NvbG9yOiAnIzVhNGYwMCcsXG4gICAgY2FudmFzX2JvcmRlcnNfY29sb3I6ICcjZjBmMGYwJ1xuICB9XG59O1xudmFyIFVTRVJfT1BUSU9OUyA9IHtcbiAgdmVsb2NpdHk6IDQwMCxcbiAgZGlmZmljdWx0eTogJ2Vhc3knLFxuICBlbmFibGVfd2FsbHM6IHRydWUsXG4gIGNvbG9yX3RoZW1lOiBDT0xPUl9USEVNRVNbXCJkZWZhdWx0XCJdXG59O1xuXG5mdW5jdGlvbiBkZWZpbmVVc2VyT3B0aW9ucyhkaWZmaWN1bHR5LCBlbmFibGVfd2FsbHMsIGNvbG9yX3RoZW1lKSB7XG4gIHN3aXRjaCAoZGlmZmljdWx0eSkge1xuICAgIGNhc2UgJ2Vhc3knOlxuICAgICAge1xuICAgICAgICBVU0VSX09QVElPTlMudmVsb2NpdHkgPSAyNTA7XG4gICAgICAgIFVTRVJfT1BUSU9OUy5kaWZmaWN1bHR5ID0gJ2Vhc3knO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtZWRpdW0nOlxuICAgICAge1xuICAgICAgICBVU0VSX09QVElPTlMudmVsb2NpdHkgPSAxMjU7XG4gICAgICAgIFVTRVJfT1BUSU9OUy5kaWZmaWN1bHR5ID0gJ21lZGl1bSc7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hhcmQnOlxuICAgICAge1xuICAgICAgICBVU0VSX09QVElPTlMudmVsb2NpdHkgPSA1MDtcbiAgICAgICAgVVNFUl9PUFRJT05TLmRpZmZpY3VsdHkgPSAnaGFyZCc7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2V4dHJlbWUnOlxuICAgICAge1xuICAgICAgICBVU0VSX09QVElPTlMudmVsb2NpdHkgPSAyNTtcbiAgICAgICAgVVNFUl9PUFRJT05TLmRpZmZpY3VsdHkgPSAnZXh0cmVtZSc7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB7XG4gICAgICAgIFVTRVJfT1BUSU9OUy52ZWxvY2l0eSA9IDI1MDtcbiAgICAgICAgVVNFUl9PUFRJT05TLmRpZmZpY3VsdHkgPSAnZWFzeSc7XG4gICAgICB9XG4gIH1cblxuICBVU0VSX09QVElPTlMuZW5hYmxlX3dhbGxzID0gZW5hYmxlX3dhbGxzO1xuXG4gIGlmICghQ09MT1JfVEhFTUVTW2NvbG9yX3RoZW1lXSkge1xuICAgIFVTRVJfT1BUSU9OUy5jb2xvcl90aGVtZSA9IENPTE9SX1RIRU1FU1tcImRlZmF1bHRcIl07XG4gIH0gZWxzZSB7XG4gICAgVVNFUl9PUFRJT05TLmNvbG9yX3RoZW1lID0gQ09MT1JfVEhFTUVTW2NvbG9yX3RoZW1lXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgcmV0dXJuIFVTRVJfT1BUSU9OUy52ZWxvY2l0eTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlmZmljdWx0eSgpIHtcbiAgcmV0dXJuIFVTRVJfT1BUSU9OUy5kaWZmaWN1bHR5O1xufVxuXG5mdW5jdGlvbiBnZXRXYWxsc0VuYWJsZWQoKSB7XG4gIHJldHVybiBVU0VSX09QVElPTlMuZW5hYmxlX3dhbGxzO1xufVxuXG5mdW5jdGlvbiBnZXRDb2xvclRoZW1lKCkge1xuICByZXR1cm4gVVNFUl9PUFRJT05TLmNvbG9yX3RoZW1lO1xufVxuXG59LHt9XX0se30sWzJdKTtcbiJdLCJmaWxlIjoiaW5kZXguanMifQ==

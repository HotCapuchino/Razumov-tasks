const { series, src, dest, watch, parallel } = require('gulp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const browserify = require('browserify');
const v_stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const fs = require('fs');
import { config } from './gulp/config';

function clean() {
    return del(config.build.root);   
}

function html() {
    return src(config.src.html)
    .pipe(dest(config.build.html));
}

function css() {
    return src(config.src.style)
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest(config.build.style))
    .pipe(browserSync.stream());
}

function js() {
    browserify(`${config.src.js}/index.js`)
    .transform('babelify', { presets: ['@babel/preset-env']})
    .bundle()
    .pipe(v_stream('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest(config.build.js))
    .pipe(browserSync.stream());
}

function trackChanges() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }, 
    });
    watch(config.watch.html).on('change', browserSync.reload);
    watch(config.watch.html, html);
    watch(config.watch.style, css);
    watch(`${config.watch.js}/*.js`).on('change', browserSync.reload);
    watch(`${config.watch.js}/*.js`, js);
}

exports.dev = series(clean, parallel(html, css, js, trackChanges));
exports.prod = series(clean, parallel(html, css, js));
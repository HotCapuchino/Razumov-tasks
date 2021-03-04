const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const include = require('gulp-file-include');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');

function clean() {
    return del('build');
}

function html() {
    return src(['development/HTML/**/*.html', '!development/HTML/**/_*.html'])
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        })).pipe(dest('build'));
}

function scss() {
    return src('development/SCSS/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(concat('index.min.css'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}

function trackChanges() {
    browserSync.init({
        server: { 
            baseDir: './build'
        }
    });
    watch('./development/**/*.html').on('change', browserSync.reload);
    watch('./development/**/*.html', html);
    watch('./development/**/*.scss', scss);
    watch('./development/res/**/*', series(deleteResources, addResources)).on('change', browserSync.reload);
}

function addResources() {
    return src('development/res/**/*')
    .pipe(imagemin())
    .pipe(dest('build/res/'))
    .pipe(browserSync.stream());
}

function deleteResources() {
    return del('build/res');
}

exports.build = series(clean, parallel(html, scss, addResources, trackChanges));
// exports.dev = series(cle)
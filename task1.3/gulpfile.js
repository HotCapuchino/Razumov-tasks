const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const include = require('gulp-file-include');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');

function clean() {
    return del('build');
}

function minifyHTML() {
    return src('build/html/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    })).pipe(dest('build'));
}

function gatherHTML() {
    return src('development/HTML/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('build'));
}

function translateSCSS() {
    return src('development/SCSS/*.scss')
    .pipe(sass())
    .pipe(dest('build/css'));
}

function minifyCSS() {
    return src('build/css/*.css')
    .pipe(cssmin())
    .pipe(dest('build/css'))
}

function addCrossBrowserSupport() {
    return src('build/css/*.css')
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
    }))
    .pipe(dest('build/css'));
}

function trackChanges() {
    browserSync.init({
        server: { 
            baseDir: './build'
        }
    });
    watch('./development/**.html', gatherHTML).on('change', browserSync.reload);
    watch('./development/**.scss', series(translateSCSS, addCrossBrowserSupport)).on('change', browserSync.reload);
    watch('./development/res/**', addResources).on('change', browserSync.reload);
}

function addResources() {
    return src('development/res/**')
    .pipe(dest('build/res/'));
}

function compressResources() {
    return src('build/res/**')
    .pipe(imagemin())
    .pipe(dest('build/res/'));
}

exports.development = series(clean, gatherHTML, translateSCSS, addCrossBrowserSupport, addResources, trackChanges);
exports.production = series(clean, gatherHTML, minifyHTML, translateSCSS, addCrossBrowserSupport, minifyCSS, addResources, compressResources);
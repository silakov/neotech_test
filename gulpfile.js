'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var imagemin        = require('gulp-imagemin');
var browserSync     = require('browser-sync');
var clean           = require('gulp-rimraf');

var src = {
  html: 'src/',
  img: 'src/assets/',
  sass: 'src/scss/',
  js: 'src/js/',
};

var dist = {
  html: 'docs/',
  img: 'docs/assets/',
  css: 'docs/css',
  js: 'docs/js',
};

gulp.task('css', function () {
  return gulp
    .src(src.sass + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy-html', function () {
  return gulp
    .src(src.html + '*.html')
    .pipe(gulp.dest(dist.html))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy-js', function () {
  return gulp
    .src(src.js + '*.js')
    .pipe(gulp.dest(dist.js))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('imagemin', function () {
  return gulp
    .src(src.img + '**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task('watch', function () {
  gulp.watch(src.html + '*.html', ['copy-html']);
  gulp.watch(src.js + '*.js', ['copy-js']);
  gulp.watch(src.sass + '*.scss', ['css']);
  gulp.watch(src.img + 'img/**/*.*', ['copy-img']);
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'docs/',
      index: 'index.html',
    },
    port: 8080,
    open: true,
    notify: false,
  });
});

gulp.task('clean', function () {
  return gulp
    .src('docs', { read: false })
    .pipe(clean());
});

gulp.task('default', [
  'copy-html',
  'copy-js',
  'imagemin',
  'css',
  'watch',
], function () {
  return gulp.start('browserSync');
});

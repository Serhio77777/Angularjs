'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function () {
  var scss = require('gulp-sass');
  return gulp.src('./styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./compiled'));
});

gulp.task('scripts', function () {
  var es6transpiler = require('gulp-es6-transpiler'),
      uglify = require('gulp-uglify'),
      ngAnnotate = require('gulp-ng-annotate');
  return gulp.src('./scripts/*.js')
    .pipe(sourcemaps.init())
    // .pipe(es6transpiler())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./compiled'));
});

gulp.task('watch', function () {
  gulp.watch('./styles/*.scss', ['scss']);
  gulp.watch('./scripts/*.js', ['scripts']);
});

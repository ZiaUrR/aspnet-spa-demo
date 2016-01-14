'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');

// Load the typescript settings from the project file.
// This makes things quite a bit easier for us to compile the files
// using the same settings as are used for the editor.
var projectSettings = ts.createProject('tsconfig.json');

// Cleans out the wwwroot/js folder, so no javascript files are left behind.
gulp.task('clean-scripts', function() {
  return gulp.src("wwwroot/js/").pipe(rimraf({ force: true }));
});

// Cleans out the wwwroot/css folder, so no css files are left behind.
gulp.task('clean-stylesheets', function() {
  return gulp.src("wwwroot/css/").pipe(rimraf({ force: true }));
});

// Compiles the typescript files, concatenates and minifies them.
// Source maps are generated so you can easily debug the javascript sources.
gulp.task('compile-typescript', function() {
  return gulp.src("Scripts/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(ts(projectSettings))
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("wwwroot/js"));
});

// Compiles the sass files in the application to CSS.
// Source maps are generated so you can easily debug any CSS problems.
gulp.task('compile-sass', function() {
  return gulp.src('Stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'Stylesheets/',
        'node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error',sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('wwwroot/css'));
});

// Concatenates and minifies the libraries used by the application.
// Modify the array below to include any libraries that you want to use.
gulp.task('concat-script-libraries', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('reference.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./wwwroot/js/'));
});

// Watches the files for changes and fires the build for them.
gulp.task('watch', function() {
  gulp.watch('Scripts/**/*.ts', ['compile-typescript']);
  gulp.watch('Stylesheets/**/*.scss', ['compile-sass']);
});

// Basic build task that wraps everything else.
// This function is called from the dnu build command.
gulp.task('build',[
  'clean-scripts',
  'clean-stylesheets',
  'compile-typescript',
  'compile-sass',
  'concat-script-libraries'
]);

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const webpack = require('webpack-stream');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');

function cleanDist() {
  return gulp.src('./dist/', {read: false, allowEmpty: true})
      .pipe(clean());
}

function runSassLint() {
  return gulp.src('./src/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
};

function runEslint() {
  return gulp.src('./src/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
}

function buildStyles() {
  return gulp.src('./src/*.scss')
      .pipe(sass({style: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(gulp.src('./dist/css/*css'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./dist/css'));
};

function assetsDev() {
  return gulp.src('src/index.js')
      .pipe(webpack({
        config: require('./webpack.development.config.js'),
      }))
      .pipe(gulp.dest('dist/'));
}

function assetsBuild() {
  return gulp.src('src/index.js')
      .pipe(webpack({
        config: require('./webpack.production.config.js'),
      }))
      .pipe(gulp.dest('dist/'));
}
exports.watch = function() {
  gulp.series(
      runSassLint, cleanDist,
      gulp.watch('./src/*.scss', {ignoreInitial: false}, buildStyles),
      gulp.watch('./src/**/*.js', {ignoreInitial: false}, assetsDev),
  );
};

exports.build = gulp.series(
    runEslint, runSassLint, cleanDist, gulp.parallel(buildStyles, assetsBuild),
);

exports.default = gulp.series(
    runEslint, runSassLint, cleanDist, gulp.parallel(buildStyles, assetsDev),
);
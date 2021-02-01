'use strict';
const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');

const paths = {
  input: 'src/',
  output: 'dist/',
  styles: {
    input: 'src/sass/**/*.{scss,sass}',
    output: 'dist/css/',
  },
  scripts: {
    input: 'src/js/**/*.js',
    output: 'dist/js',
  },
  reload: './dist/',
};

function compileJS() {
  return src(paths.scripts.input).pipe(dest(paths.scripts.output));
}

function compileSASS() {
  return src(paths.styles.input)
    .pipe(concat('index.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.output));
}

function startServer(done) {
  browserSync.init({
    server: {
      baseDir: paths.reload,
    },
  });
  done();
}

// Reload the browser when files change
function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function watchSource(done) {
  watch(paths.input, series(exports.default, reloadBrowser));
  return done();
}

exports.build = exports.default = series(compileJS, compileSASS);
exports.watch = series(exports.build, startServer, watchSource);

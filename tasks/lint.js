import gulp from 'gulp';
import gulpTslint from 'gulp-tslint';
import clangFormat from 'clang-format';
import gulpFormat from 'gulp-clang-format';

function doCheckFormat() {
  return gulp.src(['src/**/*.ts'])
    .pipe(gulpFormat.checkFormat('file', clangFormat));
}

export function tslint() {
  return gulp.src(['src/**/*.ts'])
    .pipe(gulpTslint())
    .pipe(gulpTslint.report('prose', {emitError: false}));
}

export function clang() {
  return doCheckFormat().on('warning', function(e) {
    console.log("NOTE: this will be promoted to an ERROR in the continuous build");
  });
}

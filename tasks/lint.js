import gulp from 'gulp';
import gulpTslint from 'gulp-tslint';
import shell from 'gulp-shell';
import jscs from 'gulp-jscs';

export function tslint() {
  return gulp.src(['src/**/*.ts'])
    .pipe(gulpTslint())
    .pipe(gulpTslint.report('prose', {emitError: false}));
}

export function tsFormater() {
  return gulp.src('tslint.json', {read: false})
    .pipe(shell([
      './node_modules/.bin/tsfmt -r'
    ], {
      verbose: true
    }));
}

export function lintWithJscs() {
  return gulp.src(['./**/*.js'])
    .pipe(jscs({fix: true}))
    .pipe(jscs.reporter());
}

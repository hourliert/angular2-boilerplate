import gulp from 'gulp';
import gulpTslint from 'gulp-tslint';
import shell from 'gulp-shell';

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


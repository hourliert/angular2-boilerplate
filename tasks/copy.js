import gulp from 'gulp';

export function copyIndex() {
  return gulp.src('src/index.ng2.html')
    .pipe(gulp.dest('./build'));
}

import gulp from 'gulp';
import { serve } from './tasks/serve';
import { bundle } from './tasks/bundle';
import { build } from './tasks/build';

gulp.task('default', ['build']);
gulp.task('serve', ['build'], serve);
gulp.task('bundle', bundle);
gulp.task('build', build);

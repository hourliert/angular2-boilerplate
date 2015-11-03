import gulp from 'gulp';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { server } from './tasks/server';

gulp.task('bundle', bundle);
gulp.task('serve', ['server'], serve);
gulp.task('server', ['bundle'], server);

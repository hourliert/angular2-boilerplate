import gulp from 'gulp';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { server } from './tasks/server';
import { clean } from './tasks/clean';
import { tslint, tsFormater } from './tasks/lint';

global.watch = process.argv.includes('serve');

gulp.task('bundle', ['clean'], bundle);
gulp.task('server', ['bundle'], server);
gulp.task('serve', ['server'], serve);

gulp.task('clean', clean);
gulp.task('tslint', tslint);
gulp.task('tsformater', tsFormater);
gulp.task('lint', ['tslint', 'tsformater']);
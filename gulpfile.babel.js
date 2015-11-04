import gulp from 'gulp';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { server } from './tasks/server';
import { clean } from './tasks/clean';
import { tslint, tsFormater, lintWithJscs } from './tasks/lint';
import { unitTest } from './tasks/test';

global.watch = process.argv.includes('serve');

gulp.task('bundle', ['clean'], bundle);
gulp.task('server', ['bundle'], server);
gulp.task('serve', ['server'], serve);

gulp.task('clean', clean);

gulp.task('jscs', lintWithJscs);
gulp.task('tslint', tslint);
gulp.task('tsformater', tsFormater);
gulp.task('lint', ['tslint', 'tsformater', 'jscs']);

gulp.task('unittest', unitTest);
gulp.task('test', ['unittest']);
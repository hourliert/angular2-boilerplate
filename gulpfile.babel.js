import gulp from 'gulp';
import { copyIndex } from './tasks/copy';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { server } from './tasks/server';
import { clean } from './tasks/clean';
import { tslint, tsFormater, lintWithJscs } from './tasks/lint';
import { unitTest, e2eTest, updateWebDriver } from './tasks/test';

function end() {
  process.exit(0);
}

global.watch = process.argv.includes('serve');

gulp.task('clean', clean);

gulp.task('copyindex', ['clean'], copyIndex);
gulp.task('bundle', ['clean'], bundle);
gulp.task('server', ['bundle', 'copyindex'], server);
gulp.task('serve', ['server'], serve);

gulp.task('jscs', lintWithJscs);
gulp.task('tslint', tslint);
gulp.task('tsformater', tsFormater);
gulp.task('lint', ['tslint', 'tsformater', 'jscs']);

gulp.task('update-driver', updateWebDriver);
gulp.task('unittest', unitTest);
gulp.task('e2etest', ['update-driver', 'serve'], e2eTest);
gulp.task('test', ['unittest', 'e2etest'], end);

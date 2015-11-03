import gulp from 'gulp';
import runSequence from 'run-sequence';

const DEBUG = !process.argv.includes('--release');
const WATCH = process.argv.includes('--watch');

export function build(cb) {
  if (DEBUG) {
    runSequence(
      'bundle',
      cb
    );
  } else {
    runSequence(
      'bundle',
      cb
    );

    if (WATCH) {
      gulp.watch([
        './build/bundle.js',
        './src/**/*.html',
      ], ['polybuild']);
    }
  }
}

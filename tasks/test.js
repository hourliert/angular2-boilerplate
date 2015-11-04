import gulp from 'gulp';
import shell from 'gulp-shell';
import { join } from 'path';
import { Server } from 'karma';
import { protractor } from 'gulp-protractor';

export function unitTest(done) {
  new Server({
    configFile: join(__dirname, '..', '/karma.conf.js'),
    singleRun: true
  }, done).start();
}

export function updateWebDriver() {
  return gulp.src('./protractor.conf.js', {read: false})
    .pipe(shell([
      'npm run webdriver-update'
    ], {
      verbose: true
    }));
}

export function e2eTest() {
  return gulp.src(["./test/**/*.e2e.js"])
    .pipe(protractor({
      configFile: join(__dirname, '..', '/protractor.conf.js'),
      args: ['--baseUrl', 'http://127.0.0.1:3000']
    }))
    .on('error', function(e) { throw e })
}
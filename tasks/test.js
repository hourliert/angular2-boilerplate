import gulp from 'gulp';
import { join } from 'path';
import { Server } from 'karma';

export function unitTest(done) {
  new Server({
    configFile: join(__dirname, '..', '/karma.conf.js'),
    singleRun: true
  }, done).start();
}
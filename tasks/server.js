import gulp from 'gulp';
import * as path from 'path';
import * as cp from 'child_process';

export function server(cb) {
  function start() {
    const server = cp.fork(path.join(__dirname, '../build/server.js'), null, {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    server.once('message', message => {
      if (message.match(/^online$/)) {
        cb();
      }
    });
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }

  let server = start();
  
  gulp.watch('build/server.js', (cb) => {
    server.kill('SIGTERM');
    server = start();
    cb();
  })

}
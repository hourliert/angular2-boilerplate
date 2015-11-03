import gulp from 'gulp';
import BrowserSync from 'browser-sync';

console.log(process.argv)

const DEBUG = !process.argv.includes('--release');
const WATCH = process.argv.includes('--watch');
const browserSync = BrowserSync.create();
const reload = browserSync.reload;

export function serve() {
  const serverOptions = DEBUG ? {
    baseDir: ['./src'],
    routes: {
      '/build': 'build',
    },
  } : {
    baseDir: ['./build'],
  };

  browserSync.init({
    notify: false,
    server: serverOptions,
  });

  if (WATCH) {
    gulp.watch(
      DEBUG ? [
        './build/bundle.js',
        './src/**/*.html',
      ] : [
        './build/*.html',
      ],
    reload);
  }
}

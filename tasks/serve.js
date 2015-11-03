import gulp from 'gulp';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import BrowserSync from 'browser-sync';
import webpackConfig from '../webpack.config';

const bundler = webpack(webpackConfig[0]); //client configuration
const browserSync = BrowserSync.create();

global.watch = true;

export function serve() {
  const proxyOptions = {
    target: 'localhost:5000',

    middleware: [
      webpackDevMiddleware(bundler, webpackConfig[0].devServer)
    ]
  };

  browserSync.init({
    proxy: proxyOptions,
    files: [
      './src/**/*.html',
      './src/**/*.css',
      './src/**/*.ts',
      './build/server.js'
    ]
  });
}

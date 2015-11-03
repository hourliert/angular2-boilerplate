import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

function handleCompilation(err, stats) {
  if (err) throw new gutil.PluginError('webpack', err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
  }));
}

export function bundle(callback) {
  let nbBundles = 0;
  const WATCH = global.watch;
  const compiler = webpack(WATCH ? webpackConfig[1] : webpackConfig);

  if (WATCH) {
    compiler.watch({
      aggregateTimeout: 200,
    }, (err, stats) => {
      nbBundles++;
      handleCompilation(err, stats);
      if (nbBundles === 1) {
        callback();
      }
    });
  } else {
    compiler.run((err, stats) => {
      handleCompilation(err, stats);
      callback();
    });
  }
}

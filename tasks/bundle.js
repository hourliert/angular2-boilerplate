import gutil from 'gulp-util';
import webpack from 'webpack';
import config from '../webpack.config';

const WATCH = process.argv.includes('--watch');

function handleCompilation(err, stats) {
  if (err) throw new gutil.PluginError('webpack', err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
  }));
}

export function bundle(callback) {
  let nbBundles = 0;
  const compiler = webpack(config);

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
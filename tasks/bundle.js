import gutil from 'gulp-util';
import webpack from 'webpack';
import config from '../webpack.config';

function handleCompilation(err, stats) {
  if (err) throw new gutil.PluginError('webpack', err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
  }));
}

export function bundle(callback) {
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    handleCompilation(err, stats);
    callback();
  });
}

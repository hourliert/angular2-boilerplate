import * as path from 'path';
import webpack from 'webpack';
import MutliProgress from 'multi-progress';

const multi = new MutliProgress();
const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};
const config = require('./package.json');

const TS_LOADER = {
  test: /\.tsx?$/,
  exclude: [
    /\.min\.js$/,
    /\.spec\.ts$/,
    /\.e2e\.ts$/,
    /web_modules/,
    /test/,
    /node_modules/
  ],
  query: {
    'ignoreDiagnostics': [
      // 2300, // 2300 -> Duplicate identifier
      // 2309 // 2309 -> An export assignment cannot be used in a module with other exported elements.
    ]
  },
  include: __dirname,
  loader: 'ts-loader',
};

const common = {
  name: 'common',
  
  devtool: DEBUG ? 'source-map' : false,
  context: __dirname,
  
  cache: DEBUG,
  debug: VERBOSE,
  verbose: VERBOSE,
  displayErrorDetails: VERBOSE,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  resolve: {
    root: __dirname,
    extensions: ['','.ts','.js','.json'],
    alias: {
      'rx': '@reactivex/rxjs'
      // 'common': 'src/common',
      // 'bindings': 'src/bindings',
      // 'components': 'src/app/components'
      // 'services': 'src/app/services',
      // 'stores': 'src/app/stores'
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ],

  module: {
    loaders: [
      TS_LOADER,
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }
    ],
  },
  
  ts: {
    silent: true
  }
};

const clientBar = multi.newBar('Client [:bar] :percent :elapsed s', { 
  total: 100,
  clear: true
});
const client = Object.assign({}, common, {
  name: 'client',
  
  entry: {
    'angular2': [
      // Angular 2 Deps
      '@reactivex/rxjs',
      'zone.js',
      'reflect-metadata',
      // to ensure these modules are grouped together in one file
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': [
      './src/client'
    ]
  },

  // Config for our build files
  output: {
    path: path.join(__dirname, 'build', 'client'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    publicPath: '/client/'
  },

  module: {
    loaders: [
      ...common.module.loaders,
      // Support for CSS as raw text
      {test: /\.css$/,   loader: 'raw'},

      // support for .html as raw text
      {test: /\.html$/,  loader: 'raw'},
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  },

  plugins: [
    ...common.plugins,
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : []),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.ProgressPlugin((percentage, msg) => {
      clientBar.update(percentage);
    })
  ]
});

const serverBar = multi.newBar('Server [:bar] :percent :elapsed s', { 
  total: 100,
  clear: true
});
const server = Object.assign({}, common, {
  name: 'server',
  
  entry: [
    './src/server',
  ],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  plugins: [
    ...common.plugins,
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false}),
    new webpack.ProgressPlugin((percentage, msg) => {
      serverBar.update(percentage);
    })
  ],
  module: {
    loaders: [
      ...common.module.loaders
    ],
  },
});

export default [client, server];

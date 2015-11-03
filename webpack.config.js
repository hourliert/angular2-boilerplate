import * as path from 'path';
import webpack from 'webpack';

const NODE_ENV  = process.env.NODE_ENV || 'development';
const config = require('./package.json');

// Webpack Plugins
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DedupePlugin   = webpack.optimize.DedupePlugin;
const DefinePlugin   = webpack.DefinePlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const NoErrorsPlugin = webpack.NoErrorsPlugin;

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
  devtool: 'source-map',
  debug: true,
  cache: true,

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  // our Development Server config
  devServer: {
    publicPath: '/client/',
    stats: {
      colors: true
    }
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
    new OccurenceOrderPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'VERSION': JSON.stringify(config.version)
    })
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
  }
};

const client = Object.assign({}, common, {
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
    chunkFilename: '[id].chunk.js'
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
    new DedupePlugin(),
    new CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    })
  ],
  
  node: {
    crypto: false,
    __filename: true
  }
});

const server = Object.assign({}, common, {
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
  ],
  module: {
    loaders: [
      ...common.module.loaders
    ],
  },
});

export default [client, server];

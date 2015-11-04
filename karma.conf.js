// @AngularClass

module.exports = function(config) {
  var _config = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/**/*.spec.ts', watched: false }
    ],
    

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      
      resolve: {
        root: __dirname,
        extensions: ['','.ts','.js','.json'],
        alias: {
          'rx': '@reactivex/rxjs'
        }
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.tsx?$/,
            exclude: [
              /\.min\.js$/,
              /web_modules/,
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
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          }, {
            test: /\.txt$/,
            loader: 'raw-loader',
          }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader?limit=10000',
          }, {
            test: /\.(eot|ttf|wav|mp3)$/,
            loader: 'file-loader',
          },
          {
            test: /\.css$/,
            loader: 'raw-loader!postcss-loader',
          },
    
          // support for .html as raw text
          {test: /\.html$/,  loader: 'raw'},
        ],
        noParse: [
          /rtts_assert\/src\/rtts_assert/,
          /reflect-metadata/
        ]
      },
      stats: { colors: true, reasons: true },
      debug: false
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  };
  config.set(_config);
};
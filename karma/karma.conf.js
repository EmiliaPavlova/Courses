// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'], // ['dots'] outputs a single dot, unless the test fails, in which case we get a descriptive message
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: false,
    files: [
      '../node_modules/es6-shim/es6-shim.min.js',
      'karma.entry.js'
    ],
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },
    webpack: require('../webpack/webpack.test'),
    webpackServer: {
        noInfo: true
    }
  });
};

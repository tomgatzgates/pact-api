var isCI = process.env.CI === 'true';

module.exports = function(config) {
  config.set({
    frameworks: [
      'browserify',
      'chai-as-promised',
      'mocha',
      'sinon-chai'
    ],

    files: [
      'modules/**/*.js',
      'test/**/*-test.js'
    ],

    preprocessors: {
      'modules/**/*.js': ['browserify'],
      'test/**/*-test.js': ['browserify']
    },

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,
    browserNoActivityTimeout: 45000,

    singleRun: isCI,

    reporters: [isCI ? 'dots' : 'mocha'],

    browserify: {
      debug: true,
      transform: ['babelify']
    }
  });
};

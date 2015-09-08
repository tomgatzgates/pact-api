var isCI = process.env.CI === 'true';
var devBrowser = process.env.PHANTOM ? 'PhantomJS' : 'Chrome';

module.exports = function(config) {
  config.set({
    frameworks: [
      'browserify',
      'mocha',
      'sinon-chai'
    ],

    files: [
      "modules/**/*.js",
      "test/**/*-test.js"
    ],

    preprocessors: {
      "modules/**/*.js": ["browserify"],
      "test/**/*-test.js": ["browserify"]
    },

    autoWatch: true,

    browsers: [isCI ? 'ChromeTravisCI' : devBrowser],

    singleRun: isCI,

    reporters: ['mocha'],

    browserify: {
      debug: true,
      transform: ['babelify']
    }
  });
};

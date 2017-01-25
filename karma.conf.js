
/*
 *     karma.conf.js for jChess project
 *     January 2016 by Andrii Sorokin
 *     https://github.com/ignorantic/caramel.git
 */

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha', 'chai'],
        files: [
            'dev/lib/**/*.{js, spec.js}',
            'dev/blocks/**/*.{js, spec.js}'
        ],
        exclude: [
        ],
        preprocessors: {
            'dev/lib/**/*.{js, spec.js}': ['browserify'],
            'dev/blocks/**/*.{js, spec.js}': ['browserify']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
}
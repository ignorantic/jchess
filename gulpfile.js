
/*
 *     gulpfile.js for jChess project
 *     2016 by Andrii Sorokin
 *     https://github.com/ignorantic/caramel.git
 */

const gulp          = require('gulp');
const sourcemap     = require('gulp-sourcemaps');
const gutil         = require('gulp-util');
const connect       = require('gulp-connect');
const debug         = require('gulp-debug');
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const prefixer      = require('gulp-autoprefixer');
const cssmin        = require('gulp-cssmin');
const rename        = require('gulp-rename');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const streamify     = require('gulp-streamify');
const jshint        = require('gulp-jshint');
const uglify        = require('gulp-uglify');
const cached        = require('gulp-cached');
const gulpif        = require('gulp-if');
const spritesmith   = require('gulp.spritesmith');
const svgSprite     = require('gulp-svg-sprite');
const mocha         = require('gulp-mocha');
const Karma         = require('karma').Server;
const babelify      = require('babelify');
const browserify    = require('browserify');
const del           = require('del');
const pngquant      = require('imagemin-pngquant');
const source        = require('vinyl-source-stream');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
    build:  {
        root:   'build',
        pug:    'build/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/'
    },
    src:    {
        root:   'dev',
        img:   ['dev/img/**/*.{png,jpg,gif,svg}', '!dev/img/sprite/**/*.*'],
        sprite: 'dev/img/sprite/**/*.*',
        pug:    'dev/pages/*.pug',
        sass:   'dev/index/main.sass',
        js:     'dev/index/app.js',
        fonts:  'dev/fonts/**/*.*'
    },
    sprite: {
        svg:    'dev/img/sprite.svg',
        png:    'dev/img/sprite.png',
        mixins: 'dev/mixins/',
        img:    'dev/img/'
    },
    clean:      './build',
    watch:  {
        pug:   ['dev/blocks/**/*.pug', 'dev/components/**/*.pug', 'dev/pages/**/*.pug'],
        js:    ['dev/index/**/*.js', 'dev/blocks/**/*.js', 'dev/components/**/*.js', 'dev/lib/**/*.js'],
        sass:   'dev/{index,blocks,components,mixins}/**/*.{sass,css}',
        img:    'dev/img/**/*.{png,jpg,gif,svg}',
        fonts:  'dev/fonts/**/*.{ttf,eot,svg,woff,woff2}',
        serve:  'build/**/*.*'
    }
};

/*
 *     PUG
 */

gulp.task('build:pages', function(done) {
    gulp.src(paths.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ pug error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(gulp.dest(paths.build.pug))
        .pipe(connect.reload());
    done();
});

/*
 *      SASS
 */

gulp.task('build:sass', function(done) {
    gulp.src(paths.src.sass)
        .pipe(gulpif(isDev,  sourcemap.init()))
        .pipe(sass())
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ sass error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(prefixer())
        .pipe(gulpif(isDev, sourcemap.write(), cssmin()))
        .pipe(gulp.dest(paths.build.css))
        .pipe(connect.reload());
    done();
});

/*
 *      BROWSERIFY
 */

gulp.task('build:js', function (done) {
    browserify({
            entries: paths.src.js,
            extensions: ['.js'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015'],
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ browserify error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(gulpif(!isDev, streamify(uglify())))
        .pipe(gulp.dest(paths.build.js))
        .pipe(connect.reload());
    done();
});

/*
 *      LINT
 */

gulp.task('lint:js', function() {
    return gulp.src(paths.watch.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

/*
 *      TEST
 */

gulp.task('test:js', function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        autoWatch: false,
        singleRun: true
    }, function() {
        done();
    }).start();
});

/*
 *      TDD
 */

gulp.task('tdd', function (done) {
    new Karma({
        configFile: __dirname + '/karma.conf.js',
        autoWatch: true,
        singleRun: false
    }, function() {
        done();
    }).start();
});

/*
 *      FONTS
 */

gulp.task('build:fonts', function(done) {
    gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(connect.reload());
    done();
});

/*
 *      IMAGES
 */

gulp.task('build:img', function (done) {
    gulp.src(paths.src.img)
        .pipe(cached('build:img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(debug({title: 'imagemin'}))
        .pipe(gulp.dest(paths.build.img))
        .pipe(connect.reload());
    done();
});

/*
 *      SPRITE
 */

gulp.task('build:sprite', function (done) {
    const spriteData = gulp.src('dev/img/sprite/*.png').pipe(spritesmith({
        imgName:    '../img/sprite.png',
        cssName:    '_sprite.sass',
        algorithm:  'left-right'
    }));
    spriteData.img.pipe(gulp.dest(paths.sprite.img));
    spriteData.css.pipe(gulp.dest(paths.sprite.mixins));
    done();
});

/*
 *      SVG SPRITE
 */

gulp.task('build:svgSprite', function () {
    return gulp.src(paths.src.sprite)
        .pipe(svgSprite({
            mode: {
                css: {
                    dest: './',
                    layout: 'diagonal',
                    sprite: paths.sprite.svg,
                    bust: false,
                    render: {
                        scss: {
                            dest: 'dev/mixins/_sprite_svg.scss',
                            template: 'dev/mixins/tmpl/sprite_template.scss'
                        }
                    }
                }
            },
            variables: {
                mapname: 'icons'
            }
        }))
        .pipe(gulp.dest('./'));
});

/*
 *      CLEAN
 */

gulp.task('clean', function (done) {
    del(paths.clean);
    done();
});

/*
 *      SERVER
 */

gulp.task('server', function(done) {
    connect.server({
        name: '🌍 ⇵ Caramel',
        port: 3000,
        root: 'build',
        livereload: true
    });
    done();
});

/*
 *      WATCH
 */

gulp.task('watch', function(done) {
    gulp.watch(paths.watch.pug, gulp.series('build:pages'));
    gulp.watch(paths.watch.img, gulp.series('build:img'));
    gulp.watch(paths.watch.sass, gulp.series('build:sass'));
    gulp.watch(paths.watch.fonts, gulp.series('build:fonts'));
    gulp.watch(paths.watch.js, gulp.series('lint:js', 'build:js'));
    done();
});

/*
 *      COMPLEX TASKS
 */

gulp.task('build', gulp.series('clean', 'build:pages', 'build:sprite', 'build:sass', 'test:js', 'build:js', 'build:img', 'build:fonts'));
gulp.task('default', gulp.series('build'));
gulp.task('run', gulp.series(gulp.parallel('build:pages', 'build:sass', 'lint:js', 'build:js'), gulp.parallel('watch', 'server')));
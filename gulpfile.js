const gulp          = require('gulp');
const svgSprite     = require('gulp-svg-sprite');

gulp.task('fonts', function () {
  return gulp.src('dev/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('svgSprite', function () {
  return gulp.src('dev/img/sprite-src/**/*.*')
    .pipe(svgSprite({
      mode: {
        css: {
          dest: './',
          layout: 'diagonal',
          sprite: 'dev/img/sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: 'dev/scss/sprite-svg.scss',
              template: 'dev/scss/sprite-tmpl.scss'
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

gulp.task('default', ['fonts', 'svgSprite']);

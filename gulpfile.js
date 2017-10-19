const gulp          = require('gulp');
const svgSprite     = require('gulp-svg-sprite');

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

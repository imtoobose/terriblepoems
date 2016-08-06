var 
  gulp         = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass         = require('gulp-ruby-sass'),
  uglify       = require('gulp-uglify'),
  nodemon      = require('gulp-nodemon');

gulp.task('sass', ()=>
  sass('webpage/*.scss')
    .on('error' ,sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
);

gulp.task('minjs', function(){
  gulp.src('webpage/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    ext: 'js'
  })
});

gulp.task('watch', function(){
  gulp.watch('webpage/*.scss', ['sass']);
  gulp.watch('webpage/*.js', ['minjs']);
});

gulp.task('default', ['start'], function() {  
  gulp.watch('webpage/*.scss', ['sass']);
  gulp.watch('webpage/*.js', ['minjs']);
});
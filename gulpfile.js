var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

gulp.task('date', function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getYear();
  if(dd<10){
    dd = '0'+dd
  }
  if(mm<10){
    mm = '0'+mm
  }
  today = mm+'/'+dd+'/'+yyyy
  console.log('Today is ' + today)
});

gulp.task('jshint', function(){
  return gulp.src('./js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function(){
  return gulp.src('./css/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css/'))
  .pipe(connect.reload())
});

gulp.task('watch', function(){
  gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('connect', function(){
  connect.server({
    livereload: true
  })
});

gulp.task('default', ['sass', 'connect', 'watch']);

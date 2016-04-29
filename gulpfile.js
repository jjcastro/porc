// load the plugins
var gulp = require('gulp');
var less = require('gulp-less');

// define a task called css
gulp.task('css', function() {
  
  // grab the less file, process the LESS, save to style.css
  return gulp.src('public/assets/css/style.less')
    .pipe(less())
    .pipe(gulp.dest('public/assets/css'));
    
});
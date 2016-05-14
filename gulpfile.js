// load the plugins
var gulp       = require('gulp');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var jshint     = require('gulp-jshint');
var htmlhint   = require('gulp-htmlhint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var livereload = require('gulp-livereload');
var notify     = require('gulp-notify');

// define a task called css
gulp.task('css', function() {
  
  // grab the less file, process the LESS, save to style.css
  return gulp.src('public/assets/css/style.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(livereload());

});

// task for linting js files
gulp.task('js', function() {
  return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', notify.onError(function (error) {
      return error.message;
    }));
});

// task to lint, minify, and concat frontend files
gulp.task('angular', function() {
  return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(ngAnnotate())
    .pipe(concat('all.js'))
    .pipe(uglify()) 
    .pipe(gulp.dest('public/dist'))
    .on('error', notify.onError(function (error) {
      return error.message;
    }))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('public/app/views/**/*.html')
    // .pipe(htmlhint())
    // .pipe(htmlhint.reporter())
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  // watch the less file and run the css task
  gulp.watch('public/assets/css/style.less', ['css']);
  // watch js files and run lint and run js and angular tasks
  gulp.watch(['public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
  // watch html
  gulp.watch(['public/app/views/index.html', 'public/app/**/*.html'], ['html']);
});

gulp.task('build', ['css', 'js', 'angular', 'html']);

// defining the main gulp task
gulp.task('default', ['watch']);


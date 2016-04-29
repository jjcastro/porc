// load the plugins
var gulp       = require('gulp');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var jshint     = require('gulp-jshint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');

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
    .pipe(jshint.reporter('default'));
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
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  // watch the less file and run the css task
  gulp.watch('public/assets/css/style.less', ['css']);
  // watch js files and run lint and run js and angular tasks
  gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
});

// the nodemon task
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js less html'
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function() {
      console.log('Restarted!');
    });
});

gulp.task('build', ['css', 'js', 'angular']);

// defining the main gulp task
gulp.task('default', ['nodemon']);


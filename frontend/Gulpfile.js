require("babel-polyfill"); // Fixes some undefined is not a function bug when referencing
                           // Object.assign

var gulp = require('gulp');
var webpack = require('webpack-stream');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var es = require('event-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  dist: process.cwd() + '/dist/',
  tags: 'src/tags/*.tag',
  index: 'src/index.html',
  js: 'src/js/**/*.js',
  jsdeps: 'src/jsdeps/*.js',
  sass: 'src/scss/*.scss',
  js_index: process.cwd() + '/src/js/app.js',
  js_bundle_fname: 'style-guide.js'
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ['./node_modules/bulma']
}


// Static Server + watching scss/html files
gulp.task('serve', ['sass','build'], function() {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.tags, ['js-watch']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass',function() {
  return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

// create a task that ensures the `build` task is complete before
// reloading browsers
gulp.task('js-watch', ['build'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('build', function() {
  return es.merge(
    //gulp.src(paths.tags)
    //  .pipe(riot())
    //  .pipe(concat('tags.js'))
    //  .pipe(gulp.dest('dist/js')),
    gulp.src(paths.index)
      .pipe(gulp.dest(paths.dist)),
    //gulp.src(paths.jsdeps)
    //  .pipe(gulp.dest('dist/js')),
    gulp.src(paths.js)
    //  .pipe(babel({presets:['es2015']}))
    //  .pipe(concat('style-guide.js'))
      .pipe(webpack({ entry: paths.js_index,
                      output: {
                        path: paths.dist,
                        filename: paths.js_bundle_fname
                      },
                      module: {
                        loaders: [{
                          exclude: /node_modules/,
                          loader: 'babel-loader'
                        }]
                      }}))
      .pipe(gulp.dest(paths.dist + 'js')),
    gulp.src('src/data/*.json')
      .pipe(gulp.dest('dist/data')),
    gulp.src(paths.sass)
      .pipe(sass({includePaths: ['./node_modules/bulma']}))
      .pipe(autoprefixer())
      .pipe(concat('style-guide.css'))
      .pipe(gulp.dest('dist/css'))
  );
});

gulp.task('default', ['serve']);

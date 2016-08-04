var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var config = {
    sassDir: './sass',
    scriptsDir: './js',
    cssDir: './css',
    bowerDir: './bower_components'
}

// https://github.com/sass/node-sass#options
gulp.task('sass', function () {
  gulp.src( config.sassDir + '/**/*.scss' )
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    //.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( config.cssDir ));
    // .pipe(browserSync.stream());
});

// run sass and watch for changes
gulp.task('watch', ['sass'], function () {
  gulp.watch( config.sassDir + '/**/*.scss', ['sass']);
});

// browser-sync task for starting the serve
gulp.task('default', ['watch'], function() {
    //watch files
    var files = [
        '.css/style.css'
    ];
 
    //initialize browsersync
    browserSync.init(files, {
        //browsersync with a php server
        notify: false
    });
});
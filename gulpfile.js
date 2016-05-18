var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
// var serverConfig = require('./serverConfig.json')
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('less', function() {
    return gulp.src('./assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jquery-oembed-all/jquery.oembed.js',
      './bower_components/lodash/lodash.js',
      './bower_components/handlebars/handlebars.min.js',
      './bower_components/tabletop/src/tabletop.js',
      './bower_components/jquery.scrollTo/jquery.scrollTo.min.js',
      './/bower_components/bootstrap/js/affix.js'
      ],
      {base: 'bower_components/'}
    )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('templates', function(){
  gulp.src('./templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'RM',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('serve', function() {
    browserSync.init({ server: "." });

    gulp.watch('./assets/less/*.less', ['less']);
    gulp.watch('./templates/*.hbs', ['templates']);

    gulp.watch("./templates/*.hbs").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./assets/js/*.js").on('change', browserSync.reload);
});

// gulp.task( 'deploy', ['build'], function () {

//     var conn = ftp.create(serverConfig);
//     var globs = [
//         './assets/src/**',
//         './assets/css/**',
//         './assets/images/**',
//         './assets/js/**',
//         './assets/fonts/**',
//         './index.html'
//     ];

//     return gulp.src( globs, { base: '.', buffer: false } )
//         .pipe( conn.newer( '/' ) ) // only upload newer files
//         .pipe( conn.dest( '/' ) );
// });


gulp.task('build',['less', 'js', 'templates']);
gulp.task('default', ['build', 'watch']);

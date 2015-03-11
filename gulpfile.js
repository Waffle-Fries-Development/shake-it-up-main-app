var gulp = require('gulp'),
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev');

var config = {
    sassPath: './resources/sass',
    jsPath: './resources/scripts',
    bowerDir: './bower_components' 
}

gulp.task('bower', function()
{ 
    return bower().pipe(gulp.dest(config.bowerDir)) ;
});

gulp.task('icons', function()
{ 
    return gulp
        .src(config.bowerDir + '/components-font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));

});

gulp.task('css', function()
{ 
    return sass(config.sassPath, {
            style: 'compressed',
            loadPath: [
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/foundation/scss',
                config.bowerDir + '/components-font-awesome/scss'
            ]
        })
        .pipe(gulp.dest('./public/css'));

});

gulp.task('scripts', ['app-scripts', 'admin-scripts']);

gulp.task('app-scripts', function()
{
    return gulp.src('./resources/scripts/app/application.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('admin-scripts', function()
{
    return gulp.src('./resources/scripts/admin/application.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(concat('admin.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('rev', ['rev-css', 'rev-js']);

gulp.task('rev-css', ['css'], function()
{
    return gulp.src('public/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('public/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public'));
});

gulp.task('rev-js', ['scripts'], function()
{
    return gulp.src('public/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public'));
});

// Rerun the task when a file changes
gulp.task('watch', function()
{
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
    gulp.watch(config.jsPath + '/**/*.js', ['scripts']);

});

gulp.task('build', ['icons', 'css', 'scripts']);

  gulp.task('default', ['bower', 'build']);

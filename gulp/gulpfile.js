var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');

//less编译
gulp.task('less', function () {
    gulp.src('src/css/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('dist/css'));
});

//合并css
gulp.task('css', function() {
    gulp.src(['dist/css/style.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/js'))
});

//合并scripts
gulp.task('scripts', function() {
    gulp.src(['src/js/file3.js', 'src/js/file1.js', 'src/js/file2.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
});
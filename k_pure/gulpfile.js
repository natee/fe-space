var gulp = require('gulp');
var path = require('path');
var minifyJS = require('gulp-uglify');//压缩JS
var minifyCSS = require('gulp-minify-css');//压缩CSS
var concat = require('gulp-concat');//合并

var paths = {
    src_js: 'src/js/*.js',
    src_css: 'src/css/*.css',
    dist_js:'dist/js',
    dist_css:'dist/css'
};

/**
 * 源文件目录为/src/css/*.less
 * 先通过gulp-less把.less文件编译成.css文件
 * 通过gulp-minify-css把.css文件压缩
 * 再通过gulp-concat把压缩后的.css文件合并到all.min.css中
 * 发布到/dist/css目录下
 */
gulp.task('css', function() {
    gulp.src(paths.src_css)
        // .pipe(minifyCSS())
        .pipe(gulp.dest(paths.dist_css))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.dist_css))
});

/**
 * 源文件目录为/src/js/*.js
 * 通过gulp-uglify把.js文件压缩
 * 再通过gulp-concat把压缩后的.js文件合并到all.min.js中
 * 发布到/dist/js目录下
 */
gulp.task('scripts', function() {
    gulp.src(paths.src_js)
        .pipe(minifyJS())
        .pipe(gulp.dest(paths.dist_js))
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(paths.dist_js))
});

/**
 * 监听文件变化，执行相应的任务
 */
gulp.task('watch', function() {
    gulp.watch(paths.src_js, ['scripts']);
    gulp.watch(paths.src_css, ['css']);
});

gulp.task('default', ['scripts', 'css', 'watch']);
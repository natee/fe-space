## gulp学习，常用的gulp plugins ##
默认你已经会安装gulp和gulp plugins，并且知道配置文件是怎么回事。
### gulp-less（使用less） ###
```js
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['less']);
```
参考[gulp-less](https://www.npmjs.org/package/gulp-less)        

------
### gulp-ugfily（压缩js） ###
```js
var minifyJS = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
gulp.task('default', ['minifiJS']);
```
参考[gulp-ugfily](https://www.npmjs.org/package/gulp-ugfily)    

------
### gulp-minify-css（压缩css） ###
```js
var minifyCSS = require('gulp-minify-css');

gulp.task('minify-css', function() {
  gulp.src('./static/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('default', ['minifiCSS']);
```
参考[gulp-minify-css](https://www.npmjs.org/package/gulp-minify-css)      

------
### gulp-concat（合并文件） ###
```js
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('default', ['concat']);
```
参考[gulp-concat](https://www.npmjs.org/package/gulp-concat)       

-------

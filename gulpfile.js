var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['app/scss/style.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 5 versions'],
          cascade: false
        }))
        .pipe(gulp.dest("app/css"))
        .pipe(sass({ outputStyle: 'compressed' }))
        // .pipe(minifyCss())
});

// Move the javascript files into our js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/js"))
});

gulp.task('webserver', gulp.series('sass', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: false,
      fallback: 'index.html'
    }));
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss', 'app/scss/components/*.scss', 'app/scss/components/*/*.scss'], gulp.series('sass'));
}));

gulp.task('default', gulp.parallel('js', 'webserver'));

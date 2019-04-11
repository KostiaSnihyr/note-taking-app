const gulp = require('gulp');
const sass = require ('gulp-sass');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
let cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('minjs', async function() {
    gulp.src('./js/*.js')
      .pipe(minify())
      .pipe(gulp.dest('dist'))
});

//compile scss into css
function style() {
    // 1. where is my scss file?
    return gulp.src('./scss/**/*.scss')
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
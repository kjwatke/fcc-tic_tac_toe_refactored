const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const minHtml = require('gulp-htmlmin');
const compress = require('gulp-compress');
const vendorPrefix = require('gulp-autoprefixer');

gulp.task('pug', () => {
  return gulp
    .src('./src/views/**/*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest('./src/'));
});

gulp.task('sass', () => {
  return gulp
    .src('./src/sass/*.scss')
    .pipe(vendorPrefix({browsers: ['> 0%']}))
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('typescript', () => {
  return gulp
    .src('./src/js/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('./src/js'));
});

gulp.task('watch', ['pug', 'sass', 'typescript'], () => {
  gulp.watch('./src/views/**/*.pug', ['pug']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.ts', ['typescript']);
});

gulp.task('default', ['watch']);

// Compress JavaScript files.
gulp.task('compressJs', () => {
  return gulp
    .src('./src/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('cleanCss', () => {
  return gulp
    .src('./src/css/style.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('compressHtml', () => {
  return gulp
    .src('./src/index.html')
    .pipe(minHtml({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', () => {
  return gulp
    .src('./dist/*')
    .pipe(compress())
    .dest('dist');
});

gulp.task('build', ['compressJs', 'cleanCss', 'compressHtml']);


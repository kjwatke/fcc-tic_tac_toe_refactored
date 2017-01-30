const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
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

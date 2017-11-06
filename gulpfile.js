const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Source directory
const srcDir = './src';
// Distribution directory
const distDir = './dist';

/*
 Gulp task to convert sass to vanills css
*/
gulp.task('sass', () => {
    gulp.src(`${srcDir}/sass/**/*.scss`)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(minifyCSS())
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest(distDir));
});

/*
 Gulp task to optimize images
*/
gulp.task('imagemin', () => {
    gulp.src([`${srcDir}/images/**/*.png`, `${srcDir}/images/**/*.jpg`, `${srcDir}/images/**/*.jpeg`])
        .pipe(imagemin())
        .pipe(gulp.dest(`${distDir}/images`));
});

/*
 Gulp task to minify all html files and copy them to dist directory
*/
gulp.task('html', () => {
    gulp.src(`${srcDir}/**/*.html`)
        .pipe(htmlmin({ collapseBooleanAttributes: true, collapseWhitespace: true }))
        .pipe(gulp.dest(distDir));
});

/*
Gulp task to watch the changes in the src directory
*/
gulp.task('watch', () => {
    gulp.watch(`${srcDir}/sass/*.scss`, ['sass']);
    gulp.watch([`${srcDir}/images/**/*.png`, `${srcDir}/images/**/*.jpg`, `${srcDir}/images/**/*.jpeg`], ['imagemin']);   
    gulp.watch(`${srcDir}/**/*.html`, ['html']);    
});
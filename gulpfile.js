// gulpfile.js
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const history = require('connect-history-api-fallback');
const connect = require('connect');
const Rebase = require('re-base');
const firebase = require('firebase/app');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// var database = require('firebase/database');



gulp.task('styles', () => {
    return gulp.src('dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/styles'))
        .pipe(reload({stream:true}));
});

gulp.task('js', () => {
    browserify('dev/scripts/app.js', {debug: true})
        .transform('babelify', {
            sourceMaps: true,
            "presets": ["es2015", "es2016", "react"], 
            "plugins": ["transform-object-rest-spread"]
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        middleware: [history()] // <-- add this line
    });
});

gulp.task('default', ['js','bs', 'styles'], () => {
    gulp.watch('dev/**/*.js',['js']);
    gulp.watch('dev/**/*.scss',['styles']);
    gulp.watch('./public/styles/style.css',reload);
});
const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

// обновляю страницу
function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return del('dist') 
}

function images(){
    return src('app/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}

// готовлю скрипты, собираю в один, минифицирую, меняю имя, бросаю в папку, обновляю страницу
function scripts(){
    return src([
        'app/js/main.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

// готовлю стили
function styles(){
    return src('app/scss/style.scss')
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

// строю финальный билд
function build(){
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html',
        'app/fonts/**/*'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

// слежу за стилями и дергаю функции
function watching(){
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

// запускаю финальный билд
exports.build = series(cleanDist, images, build);
// запускаю сервер и начинаю следить за файлами
exports.default = parallel(styles, scripts, browsersync, watching);
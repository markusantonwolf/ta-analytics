const { src, dest, parallel, series } = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

const SCRIPTS_DESTINATION = './dist/scripts'

const alpine_js = () => {
    return src(['./node_modules/alpinejs/dist/alpine.js'])
        .pipe(concat('alpine.js'))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(SCRIPTS_DESTINATION))
}
const ta_script = () => {
    return src(['./src/scripts/ta-*.js'])
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(concat('ta-analytics.js'))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(SCRIPTS_DESTINATION))
}
const ta_script_alpine = () => {
    return src(['./node_modules/alpinejs/dist/alpine.js', './dist/scripts/ta-analytics.js'])
        .pipe(concat('alpine-ta-analytics.js'))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(SCRIPTS_DESTINATION))
}

module.exports.scripts = series(parallel(alpine_js, ta_script), ta_script_alpine)

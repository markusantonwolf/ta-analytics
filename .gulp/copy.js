const { src, dest, parallel } = require('gulp')
const print = require('gulp-print').default

const copy_css = () => {
    return src(['./dist/styles/**/*.css'], {
        allowEmpty: true
    }).pipe(dest('./public/css')).pipe(print())
}
const copy_js = () => {
    return src(['./dist/scripts/**/*.js'], {
        allowEmpty: true
    }).pipe(dest('./public/js')).pipe(print())
}
const copy_html = () => {
    return src(['./dist/views/index.html'], {
        allowEmpty: true
    }).pipe(dest('./public')).pipe(print())
}

module.exports.copy = parallel(copy_css, copy_js, copy_html)

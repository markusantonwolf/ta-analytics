const { src } = require('gulp')
const clean = require('gulp-clean')

module.exports.clean = () => {
    return src(['./dist', './public/index.html', './public/css', './public/js'], {
        read: false,
        allowEmpty: true
    }).pipe(clean())
}

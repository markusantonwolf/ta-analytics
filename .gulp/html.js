const { src, dest } = require('gulp')
const fileinclude = require('gulp-file-include')

module.exports.html = () => {
    return src(['./src/views/index.html'])
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(dest('./dist/views'))
}

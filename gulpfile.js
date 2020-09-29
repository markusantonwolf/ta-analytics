const gls = require('gulp-live-server')
const { series, watch, parallel } = require('gulp')

const { clean } = require('./.gulp/clean')
const { copy } = require('./.gulp/copy')
const { html } = require('./.gulp/html')
const { styles } = require('./.gulp/styles')
const { scripts } = require('./.gulp/scripts')

const STYLES_SOURCE = './src/styles/*.css'
const SCRIPTS_SOURCE = './src/scripts/*.js'
const VIEWS_SOURCE = './src/views/*.html'
const SNIPPETS_SOURCE = './src/snippets/*.html'

const watch_changes = () => {
    var server = gls.static('public', 9999)
    server.start()

    watch(STYLES_SOURCE, series(styles, copy))
    watch(SCRIPTS_SOURCE, series(scripts, copy))
    watch(VIEWS_SOURCE, series(html, copy))
    watch(SNIPPETS_SOURCE, series(html, copy))
}

exports.build = series(clean, parallel(styles, scripts), html, copy)
exports.serve = series(clean, parallel(styles, scripts), html, copy, watch_changes)

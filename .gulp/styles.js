const config = require('config')
const { src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const concat = require('gulp-concat');

const SOURCE_STYLES = config.get('source.styles')
const DESTINATION_STYLES = config.get('destination.styles')
const SOURCE_PLUGIN_CSS = config.get('source.plugin_css')
const DESTINATION_STYLES_CSS = config.get('destination.plugin_css')
const PURGE_STYLES = config.get('purge.styles')
const PURGE_PLUGIN = config.get('purge.plugin')

const STYLES_DESTINATION = './dist/styles'

const styles_styles = () => {
    const postcssOptions = [require('tailwindcss'), require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src(SOURCE_STYLES).pipe(postcss(postcssOptions)).pipe(dest(DESTINATION_STYLES))
}
const styles_taAnalytics = () => {
    const postcssOptions = [require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src(SOURCE_PLUGIN_CSS)
        .pipe(postcss(postcssOptions))
        .pipe(concat('ta-analytics.min.css'))
        .pipe(dest(DESTINATION_STYLES_CSS))
}

module.exports.styles = parallel(styles_styles, styles_taAnalytics)

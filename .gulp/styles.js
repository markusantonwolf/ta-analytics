const { src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')

const STYLES_DESTINATION = './dist/styles'

const styles_styles = () => {
    const postcssOptions = [require('tailwindcss'), require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            purgecss({
                content: ['./src/views/*.html'],
                defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
            })
        )
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src('./src/styles/styles.css').pipe(postcss(postcssOptions)).pipe(dest(STYLES_DESTINATION))
}
const styles_taAnalytics = () => {
    const postcssOptions = [require('tailwindcss'), require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            purgecss({
                content: ['./src/snippets/*.html'],
                defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
            })
        )
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src('./src/styles/ta-analytics.css').pipe(postcss(postcssOptions)).pipe(dest(STYLES_DESTINATION))
}

module.exports.styles = parallel(styles_styles, styles_taAnalytics)

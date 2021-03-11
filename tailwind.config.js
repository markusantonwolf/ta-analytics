const ta_analytics_safelist = require('./src/plugin/safelist');

module.exports = {
    purge: {
        enabled: process.env.HUGO_ENVIRONMENT === 'production' ? true : false,
        content: ['./src/**/*.html'],
        options: {
            safelist: [...ta_analytics_safelist],
        },
        defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('./src/plugin/index.js')],
}

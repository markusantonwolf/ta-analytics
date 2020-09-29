const colors = {
    primary: '#EB5C47',
    secondary: '#478cb8',
    highlight: '#12978a',
}

module.exports = {
    purge: {
        enabled: false,
    },
    // purge: {
    //     enabled: process.env.NODE_ENV === 'production' ? true : false,
    //     mode: 'all',
    //     content: ['./resources/**/*.blade.php'],
    //     options: {
    //         whitelist: [],
    //     },
    //     defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
    // },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    theme: {
        fontFamily: {
            sans: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
        },
        container: {
            center: true,
        },
        fontWeight: {
            light: 300,
            normal: 400,
            bold: 700,
            black: 900,
        },
        height: (theme) => ({
            auto: 'auto',
            ...theme('spacing'),
            full: '100%',
            screen: 'calc(var(--vh) * 100)',
        }),
        textColor: (theme) => ({
            ...theme('colors'),
            ...colors,
        }),
        minHeight: (theme) => ({
            0: '0',
            ...theme('spacing'),
            full: '100%',
            auto: 'auto',
            screen: 'calc(var(--vh) * 100)',
            hero: 'calc(var(--vh) * 100 - var(--nav-height))',
        }),
        extend: {
            maxWidth: (theme) => ({
                ...theme('spacing'),
                xxs: '16rem',
            }),
            colors: {
                ...colors,
            },
            fontSize: {
                xxs: '0.65rem',
                md: '0.925rem',
            },
            backgroundColor: {
                ...colors,
            },
            backgroundOpacity: {
                30: '0.1',
                20: '0.2',
                30: '0.3',
                40: '0.4',
                50: '0.5',
                60: '0.6',
                70: '0.7',
                80: '0.8',
                90: '0.9',
            },
            borderOpacity: {
                10: '0.1',
                20: '0.2',
                30: '0.3',
                40: '0.4',
                50: '0.5',
                60: '0.6',
                70: '0.7',
                80: '0.8',
                90: '0.9',
            },
            borderRadius: {
                xl: '1rem',
            },
            spacing: {
                72: '18rem',
                80: '20rem',
                88: '22rem',
                96: '24rem',
                104: '26rem',
                112: '28rem',
                120: '30rem',
                128: '32rem',
            },
            zIndex: {
                5: '5',
            },
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
        cursor: ['responsive', 'hover', 'disabled'],
    },
    plugins: [require('@tailwindcss/ui')],
}

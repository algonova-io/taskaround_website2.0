// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxtjs/i18n',
    ],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            link: [
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap'},
                {rel: 'stylesheet', href: '/fonts/adineue-pro.css'}
            ]
        }
    },
    i18n: {
        strategy: 'no_prefix',
        defaultLocale: 'de',
        locales: [
            {
                code: 'de',
                iso: 'de-DE',
                name: 'Deutsch',
                file: 'de-DE.json'
            },
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en-US.json'
            },
            {
                code: 'es',
                iso: 'es-ES',
                name: 'Spanish',
                file: 'es-ES.json'
            }
        ]
    },

    ui: {
        fonts: true,
        colorMode: true,
        theme: {
            colors: [
                'primary',
                'secondary',
                'success',
                'info',
                'warning',
                'error',
                'blue',
                'green',
                'celeste',
                'deepgrey',
                'lightgrey',
                'surface',
                'background',
                'text'
            ],
            transitions: true,
            defaultVariants: {
                color: 'primary',
                size: 'md'
            }
        }
    }
})
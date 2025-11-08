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
})
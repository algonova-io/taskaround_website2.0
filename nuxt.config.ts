// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    runtimeConfig: {
        public: {
            googleMapsKey: '',
            firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
            firebaseRegion: process.env.NUXT_PUBLIC_FIREBASE_REGION || 'europe-west1'
        }
    },
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
            link: []
        }
    },
    router: {
        options: {
            // Normal routes stay the same, we rewrite dynamically
            strict: false
        }
    },

    i18n: {
        strategy: 'no_prefix',
        defaultLocale: 'de',
        detectBrowserLanguage: {
            useCookie: true,
            cookieCrossOrigin: true
        },
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
                name: 'Español',
                file: 'es-ES.json'
            },
            {
                code: 'it',
                iso: 'it-IT',
                name: 'Italiano',
                file: 'it-IT.json'
            },
            {
                code: 'ru',
                iso: 'ru-RU',
                name: 'Русский',
                file: 'ru-RU.json'
            },
            {
                code: 'uk',
                iso: 'uk-UA',
                name: 'Українська',
                file: 'uk-UA.json'
            }
        ]
    },

    ui: {
        fonts: true,
        colorMode: false,
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
                'black',
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
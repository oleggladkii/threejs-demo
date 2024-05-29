// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@nuxt/eslint'],
  quasar: {
    sassVariables: '@/assets/scss/quasar.variables.scss',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  routeRules: {
    '/gallery': {
      ssr: false,
    },
  },
})

export default defineNuxtConfig({
  modules: ['../src/module'],
  compatibilityDate: '2024-07-16',
  runtimeConfig: {
    mailer: {
      from: '',
      transport: '',
      host: '',
      port: 0,
    },
  },
})

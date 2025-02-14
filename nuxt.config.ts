// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'https://67a9c3946e9548e44fc4c2e4.mockapi.io/api/contacts'
    }
  },
  pages: true,
  css: ['@/assets/styles/style.scss']
});


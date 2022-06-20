export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Prezaty | Plataforma para criar robôs de investimento para Meta Trader 5',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Plataforma para criação de robôs de investimentos para Meta Trader 5, com mais de 20 indicadores técnicos e mais de 200 sinais de entradas.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/android-icon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/android-icon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/android-icon-16x16.png' },
      { rel: 'manifest', href: '/favicon/manifest.json' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: 'primevue/resources/primevue.min.css'},
    { src: 'primevue/resources/themes/saga-blue/theme.css'},
    { src: 'primeicons/primeicons.css'},
    { src: 'primeflex/primeflex.css'}
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src:'~/plugins/mailchimp.js', mode: 'client'},
    {src:'~/plugins/primevue.js', mode: 'client'},
    {src:'~/plugins/fontawesome.js', mode: 'client'},
    {src:'~/plugins/veevalidate.js', mode: 'client'},
    {src:'~/plugins/vmask.js', mode: 'client'},
    {src:'~/plugins/vmoney.js', mode: 'client'},
    {src:'~/plugins/filter.js', mode: 'client'},
    {src:'~/plugins/directive.js', mode: 'client'},
    {src:'~/plugins/axios.js', mode: 'client'},
    {src:'~/plugins/apexcharts.js', mode: 'client'},
    {src:'~/plugins/lightbox.js', mode: 'client', ssr: false}
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    ['vue-scrollto/nuxt', { duration: 300 }],
    ['nuxt-facebook-pixel-module', {
      pixelId: '314581209144253',
      autoPageView: true
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_API_URL
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, ctx) {
    }
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL || 'https://prezaty.com.br',
    TIME_ZONE: 'America/Fortaleza',
    PT_BR: {
      CALENDAR: {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do","Se","Te","Qa","Qi","Sx","Sa"],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'Wks'
      }  
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.BASE_API_URL + '/user/login', method: 'post', propertyName: 'token' },
          user: { url: process.env.BASE_API_URL + '/user/principal', method: 'get', propertyName: false  },
          logout: false,
          tokenRequired: true,
          tokenType: 'bearer',
          autoFetchUser: true
        }
      }
    }
  },
  googleAnalytics: {
    id: 'UA-131458159-1'
  },
  sitemap: {
    hostname: 'https://prezaty.com.br'
  },
  loading: {
    color: 'black',
    height: '5px',
    continuous: true
  }
}

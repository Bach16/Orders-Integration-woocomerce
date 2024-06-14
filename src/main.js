import { createApp } from 'vue'

import { createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'



// Vuetify, 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import VueHtmlToPaper from 'vue-html-to-paper';

import App from './App.vue'
import UtilsPlugin from './plugins/utils'


const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://unpkg.com/vuetify@latest/dist/vuetify.min.css',
    'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
    '/print.css'
   
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

/* Vue.use(VueHtmlToPaper, options);  */

// or, using the defaults with no stylesheet
//Vue.use(VueHtmlToPaper);
// Components

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes:{
      light:{
        dark: false,
        colors: {
          primary: '#263D8D',
          secondary: '#8693BF',
          background: 'DBE1E9'
        },
        variables: {
          'border-color': '#000000',
        }
      }
    }
  }
})

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('./views/Auth.vue'),
  },
  {
    path: '/searchOrder',
    name: 'searchOrder',
    component: () => import('./views/SearchOrder.vue'),
  },
  {
    path: '/preparationOrder/:id',
    name: 'preparationOrder',
    component: () => import('./views/PreparationOrder.vue'),
  },
  {
    path: '/sendOrder/:id',
    name: 'sendOrder',
    component: () => import('./views/SendOrder.vue'),
  },
  {
    path: '/deliveredOrder/:id',
    name: 'deliveredOrder',
    component: () => import('./views/DeliveredOrder.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router

createApp(App).use(UtilsPlugin).use(vuetify).use(VueHtmlToPaper,options).use(createPinia()).use(router).mount('#app')


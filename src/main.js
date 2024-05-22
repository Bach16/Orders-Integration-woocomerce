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


const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

/* Vue.use(VueHtmlToPaper, options);  */

// or, using the defaults with no stylesheet
//Vue.use(VueHtmlToPaper);
// Components
import App from './App.vue'

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
    path: '/deliveredOrder',
    name: 'deliveredOrder',
    component: () => import('./views/DeliveredOrder.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router

createApp(App).use(vuetify).use(VueHtmlToPaper,options).use(createPinia()).use(router).mount('#app')


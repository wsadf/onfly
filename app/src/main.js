import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'
import "vue3-snackbar/styles"; 


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";

const vuetify = createVuetify({
  components,
  directives,
  aliases,
  fa,
  
})


// createApp(App)
// .use(router)
// .use(vuetify)
// .use(SnackbarService)
// .mount('#app')

const app = createApp(App);
app.component("vue3-snackbar", Vue3Snackbar);
app.use(router);
app.use(vuetify);
app.use(SnackbarService);
app.mount("#app");
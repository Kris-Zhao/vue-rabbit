import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'
import { imgLazyDirectivePlugin } from './directives'
import { componentPlugin } from './components'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(imgLazyDirectivePlugin)
app.use(componentPlugin)

app.mount('#app')
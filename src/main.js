import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'
import { imgLazyDirectivePlugin } from './directives'
import { componentPlugin } from './components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(imgLazyDirectivePlugin)
app.use(componentPlugin)

app.mount('#app')
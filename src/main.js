import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

// test axios instance
import { getCatgoryAPI } from './apis/testAPI'
getCatgoryAPI().then(res => {
  console.log(res);
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

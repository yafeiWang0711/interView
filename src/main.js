import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './router'

import store from './store/index_vuex'

import 'viewerjs/dist/viewer.css'

import Viewer from 'v-viewer'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(store)
app.use(router)
app.use(Viewer, {
    defaultOptions: {
        zIndex: 9999,
        toolbar: false,
        transition: false,
        title: false,
        navbar: false,
        // button:false,
        scalable: false,
        rotatable: false,
        tooltip: false,
        inline: false,
    }
})
app.mount('#app')

// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from './App.vue'
import router from './router'

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
// import { DatePicker } from 'ant-design-vue';
// import {Slider} from "ant-design-vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// app.use(DatePicker);
// app.use(Slider)
// app.use(Antd);
app.use(ElementPlus)

app.mount('#app')

//CSS
import './assets/main.css'


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


// VUE
import router from './router'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia();
app.use(pinia); // Registra Pinia
app.use(router)
app.mount('#app')
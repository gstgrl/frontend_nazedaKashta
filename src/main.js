//CSS
import './assets/main.css'


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


// VUE
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)
app.use(router)
app.mount('#app')
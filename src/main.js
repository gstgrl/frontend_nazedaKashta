//BOOTSTRAP
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Tooltip, Popover } from 'bootstrap';

// VUE
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'

// Inizializza tutti i tooltip presenti nella pagina
document.addEventListener('DOMContentLoaded', () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
});

document.addEventListener('DOMContentLoaded', () => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))
  });






const app = createApp(App)
app.use(router)
app.mount('#app')

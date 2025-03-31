import { defineStore } from 'pinia';

export const useTitleStore = defineStore('title', {
    state: () => ({
        title: 'Pagina Predefinita'  // Titolo di default
    }),
    actions: {
        setTitle(newTitle) {
            this.title = newTitle;
            document.title = newTitle;  // Cambia il titolo della pagina
        }
    }
});

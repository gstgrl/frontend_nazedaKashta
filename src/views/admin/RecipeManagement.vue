<script setup>
    import { ref, onMounted } from "vue";
    import { db } from "@/firebase"; // Assicurati che il percorso sia corretto
    import { collection, getDocs } from "firebase/firestore";
    import cardRecipeAdmin from "./cardRecipeAdmin.vue";


    // Variabile per i dati
    const recipes = ref([]);

    // Funzione per recuperare i dati
    const fetchRecipes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Recipes"));
            recipes.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Errore nel recupero dati:", error);
        }
    };

    // Recupera i dati quando il componente è montato
    onMounted(fetchRecipes);
</script>

<template>
  <div class="container">
    <cardRecipeAdmin v-for="recipe in recipes" 
        :data = recipe
    />
  </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
        margin-top: 50px;
    }
</style>

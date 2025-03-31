<script setup>
    import { ref, onMounted } from "vue";
    import { db } from "@/firebase"; // Assicurati che il percorso sia corretto
    import { collection, getDocs } from "firebase/firestore";


    // Variabile per i dati
    const recipes = ref([]);
    const loading = ref(true); // ✅ Variabile per gestire il caricamento

    // Funzione per recuperare i dati
    const fetchRecipes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Recipes"));
            recipes.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            //console.log(recipes.id)
        } catch (error) {
            console.error("Errore nel recupero dati:", error);
        } finally {
            // ✅ Aspetta 1.5 secondi prima di nascondere il loader
            setTimeout(() => {
                loading.value = false;
            }, 1500); 
        }
    };

    // Recupera i dati quando il componente è montato
    onMounted(fetchRecipes);
</script>





<template>
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Caricamento in corso...</p>
    </div>

    <div class="container" v-else>
        <div class="container my-3 meal-conainer">
            <CardRecipe v-for="recipe in recipes" 
                :data = recipe
            />
        </div>
    </div>
</template>

<script>
    import CardRecipe from '@/components/recipeComponents/cardRecipe.vue';
    //import data from '../json_files/test.json'

    export default {
        data() {
            return {
            }
        },
        components: {
            CardRecipe
        }
    }
</script>

<style scoped>
    .meal-conainer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    /* Spinner di caricamento */
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #ff9800; /* Arancione */
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>
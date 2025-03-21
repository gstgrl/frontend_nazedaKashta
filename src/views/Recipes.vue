<script setup>
    import { ref, onMounted } from "vue";
    import { db } from "@/firebase"; // Assicurati che il percorso sia corretto
    import { collection, getDocs } from "firebase/firestore";


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

            //console.log(recipes.id)
        } catch (error) {
            console.error("Errore nel recupero dati:", error);
        }
    };

    // Recupera i dati quando il componente è montato
    onMounted(fetchRecipes);
</script>





<template>
    <div class="container">

        <div class="container my-3 meal-conainer">
            <CardRecipe v-for="recipe in recipes" 
                :data = recipe
            />
        </div>
    </div>
</template>

<script>
    import CardRecipe from '@/components/recipeComponents/cardRecipe.vue';
    import data from '../json_files/test.json'

    export default {
        data() {
            return {
                recipes: data
            }
        },
        components: {
            CardRecipe
        }
    }
</script>

<style scoped>
    .meal-conainer {
        width: fit-content;
    }
</style>
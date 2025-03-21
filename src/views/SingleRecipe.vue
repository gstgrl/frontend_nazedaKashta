<script setup>
    import { ref, onMounted } from "vue";
    import { db } from "@/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import { useRoute } from 'vue-router';
    //import data from '../json_files/test.json'
    import CookingTime from '../components/recipeComponents/icons/cookingTime.vue';
    import PreparingTime from '../components/recipeComponents/icons/preparingTime.vue';
    import Difficulty from '../components/recipeComponents/icons/difficulty.vue';

    const route = useRoute();
    const recipeID = route.params.id; // Accesso al parametro dinamico "id"
    const recipe = ref(null)


    const extractRecipe = async () => {

        try {
            const docRef = doc(db, "Recipes", recipeID);
            const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            recipe.value = docSnap.data()
            console.log("Dati ricetta:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("Nessuna ricetta trovata!");
            return null;
        }
        } catch (error) {
            console.error("Errore nel recupero del documento:", error);
        }
    }


    onMounted(extractRecipe)

    console.log(recipe)
</script>


<template>
    <div class="container my-5" v-if="recipe">
        <h1>{{ recipe.title }}</h1>

        <div class="row">
            <div class="col-10">
                {{ recipe.description }}
                
                <div class="container">
                    <h4 class="mt-4">PREPARAZIONE</h4>
                        <div class="card mb-3" style="max-width: 1040px;" v-for="(step, index) in recipe.steps"  :key="index">
                            <div class="row g-0">

                                <div class="col-md-4">
                                    <img :src="step.url" class="img-fluid rounded-start" alt="immagine procedimento">
                                </div>

                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">STEP {{ step.number }}</h5>
                                        <p class="card-text">{{ step.description }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <hr>
                </div>
            </div>

            <div class="col-2">
                <div class="recipe-container mb-2">
                    <h6 class="text-center mb-4">INFORMAZIONI</h6>
                    <Difficulty :data="recipe.difficulty" class="mx-auto"/>
                    <PreparingTime :data="recipe.preparing_Time" :mobile="false"/>
                    <CookingTime :data="recipe.cooking_Time" :mobile="false"/>
                </div>

                <div class="recipe-container">
                    <h6 class="text-center mb-4">INGREDIENTI</h6>
                    <ul>
                        <li v-for="(item) in recipe.ingredients">{{ item.quantity }} {{ item.unit }} di <strong>{{ item.ingredient }}</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
            CookingTime,
            PreparingTime,
            Difficulty
        }
    };
</script>

<style scoped>
    .recipe-container {
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.5);
        border-radius: 1rem;
        padding: 0.5rem;
    }
</style>
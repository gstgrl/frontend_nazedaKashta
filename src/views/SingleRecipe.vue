<script setup>
    import { ref, onMounted } from "vue";
    import { db } from "@/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import { useRoute } from 'vue-router';
    import { useBannerStore } from "@/store/bannerStore";
    import { useTitleStore } from "@/store/recipeTitleStore";

    const route = useRoute();
    const recipeID = route.params.id; 
    const recipe = ref(null);
    const bannerStore = useBannerStore(); // Ottieni lo store globale per il banner
    const titleStore = useTitleStore()

    const extractRecipe = async () => {
        try {
            const docRef = doc(db, "Recipes", recipeID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                recipe.value = docSnap.data();
                bannerStore.setBannerImage(recipe.value.recipe_image); // Aggiorna l'immagine
                titleStore.setTitle(recipe.value.title);
            } else {
                console.log("Nessuna ricetta trovata!");
            }
        } catch (error) {
            console.error("Errore nel recupero del documento:", error);
        }
    };

    onMounted(extractRecipe);
</script>


<template>
    <div class="container my-5" v-if="recipe">
        <h1>{{ recipe.title }}</h1>
        <span><Tag :data="recipe.mealTag"/></span>

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
    import CookingTime from "@/components/recipeComponents/icons/cookingTime.vue";
    import PreparingTime from "@/components/recipeComponents/icons/preparingTime.vue";
    import Difficulty from "@/components/recipeComponents/icons/difficulty.vue";
    import Tag from "@/components/recipeComponents/icons/tag.vue";

    export default {
        components: {
            CookingTime,
            PreparingTime,
            Difficulty,
            Tag
        }
    };
</script>

<style scoped>
    .recipe-container {
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.5);
        border-radius: 1rem;
        padding: 0.5rem;
    }

    @media (max-width: 767px) {
        .row {
            flex-direction: column;
        }

        .col-2 {
            width: 100%;
        }
    }

</style>
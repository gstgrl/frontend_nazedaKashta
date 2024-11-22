<template>
    <div class="container my-5">
        <h1>{{ recipe.title }}</h1>

        <div class="row">
            <div class="col-10">
                {{ recipe.description }}
                
                <div class="container">
                    <h4 class="mt-4">PREPARAZIONE</h4>
                    <div class="step-description mt-4" v-for="(item, index) in recipe.steps">
                        <h6>STEP {{ index + 1 }}</h6>
                        <p>{{ item.step_description }}</p>
                        <hr>
                    </div>
                </div>
            </div>

            <div class="col-2">
                <div class="recipe-container mb-2">
                    <h6 class="text-center mb-4">INFORMAZIONI</h6>
                    <Difficulty :data="recipe.difficulty" class="mx-auto"/>
                    <PreparingTime :data="recipe.preparing_time" :mobile="mobile"/>
                    <CookingTime :data="recipe.cooking_time" :mobile="mobile"/>
                    <Calories :data="recipe.calories" :mobile="mobile"/>
                </div>

                <div class="recipe-container">
                    <h6 class="text-center mb-4">INGREDIENTI</h6>
                    <ul>
                        <li v-for="(item, index) in recipe.ingredients">{{ item.quantity }} {{ item.unit }} di <strong>{{ item.ingredient }}</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute } from 'vue-router';
    import { onMounted } from 'vue'
    import data from '../json_files/test.json'
    import Calories from '../components/recipeComponents/icons/calories.vue';
    import CookingTime from '../components/recipeComponents/icons/cookingTime.vue';
    import PreparingTime from '../components/recipeComponents/icons/preparingTime.vue';
    import Difficulty from '../components/recipeComponents/icons/difficulty.vue';
    import { useDevice } from '@/javasciptFiles/isMobile';

    export default {
        setup() {
            const route = useRoute();
            const recipeId = route.params.id; // Accesso al parametro dinamico "id"

            onMounted(() => {
                document.title = ` ${recipeId}`;
            });

            return { recipeId };
        },
        data() {
            return {
                recipe: data,
                mobile: useDevice()
            }
        },
        components: {
            Calories,
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
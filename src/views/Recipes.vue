<template>
    <div class="container">

        <div class="container my-3 meal-conainer">
            <CardRecipe
                :data = recipes
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

</style>
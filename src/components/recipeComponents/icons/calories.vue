<template>
    <div class="info-recipe" v-if="!mobile">
        <img src="../../../assets/fire.png" :alt="data.type" class="info-recipe-img">
        <p>{{ data.value }} Kcal</p>
    </div>

    <div class="info-recipe" v-else>
        <img src="../../../assets/fire.png" 
            :alt="data.type" 
            class="info-recipe-img" 
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom" 
            data-bs-custom-class="custom-tooltip" 
            :data-bs-title="data.value + ' Kcal'">
    </div>
</template>

<script>

    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
            mobile: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>
    img {
        height: 1.5rem;
        width: auto;
    }
</style>
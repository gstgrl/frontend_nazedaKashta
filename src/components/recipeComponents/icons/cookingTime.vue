<template>
    <div class="info-recipe">
        <img src="../../../assets/chef.png" :alt="data.type" class="info-recipe-img">
        <p>{{ data.value }} min</p>
    </div>
</template>

<script>

    export default {
        props: {
            data: {
                type: Object,
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
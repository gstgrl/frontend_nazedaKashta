<template>
    <p class="info-tag" :style="{ backgroundColor: data.backgroundColor }">{{ data.tagText }}</p>
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
    .info-tag {
        padding: 0.2rem 0.5rem;
        border-radius: 0.6rem;
    }

    p {
        color: white;
        font-weight: bold;
        font-size: 0.6rem;
        margin: 0;
        max-width: fit-content;
    }
</style>
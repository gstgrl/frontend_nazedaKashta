<template>
    {{ recipeId }}
</template>

<script>
    import { useRoute } from 'vue-router';
    import { onMounted } from 'vue'

    export default {
        setup() {
            const route = useRoute();
            const recipeId = route.params.id; // Accesso al parametro dinamico "id"

            onMounted(() => {
                document.title = ` ${recipeId}`;
            });

            return { recipeId };
        },
    };
</script>
<template>
    <div class="info-recipe ">
        <div class="difficuty-icon">
            <div :class="['rectangle-easy', { active: easy }]"></div>
            <div :class="['rectangle-medium', { active: medium }]"></div>
            <div :class="['rectangle-hard', { active: hard }]"></div>
            <div :class="['rectangle-very-hard', { active: very_hard }]"></div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const easy = ref(true)
    const medium = ref(false)
    const hard = ref(false)
    const very_hard = ref(false)

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });


    const updateDifficulty = () => {
        // Reset difficoltà
        easy.value = false;
        medium.value = false;
        hard.value = false;
        very_hard.value = false;

        // Logica per settare le difficoltà in base al numero
        if (props.data.number >= 1) easy.value = true;
        if (props.data.number >= 2) medium.value = true;
        if (props.data.number >= 3) hard.value = true;
        if (props.data.number >= 4) very_hard.value = true;
    };
    
    watch(() => props.data.number, updateDifficulty, { immediate: true });
</script>

<style scoped>

    .difficuty-icon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: baseline;

        margin-bottom: 0.5rem;
    }

    .rectangle-easy.active {
        height: 15px;
        width: 8px;
        background-color: green;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-medium.active {
        height: 20px;
        width: 8px;
        background-color: yellow;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-hard.active {
        height: 25px;
        width: 8px;
        background-color: orange;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-very-hard.active {
        height: 30px;
        width: 8px;
        background-color: red;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }
</style>
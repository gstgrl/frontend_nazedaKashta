<template>
    <div class="info-recipe ">
        <div class="difficuty-icon" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" :data-bs-title="tooltip"    >
            <div class="rectangle-easy"></div>
            <div class="rectangle-medium" v-if="medium"></div>
            <div class="rectangle-hard" v-if="hard"></div>
            <div class="rectangle-very-hard" v-if="very_hard"></div>
        </div>
    </div>
</template>

<script>

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                easy: true,
                medium: false,
                hard: false,
                very_hard: false,
                tooltip: 'Facile'
            }
        },
        mounted() {
            if(this.data.value == 2) {
                this.medium = true
                this.tooltip = "Media"
            }else if(this.data.value == 3) {
                this.medium = true
                this.hard = true
                this.tooltip = "Difficile"
            }else if(this.data.value == 4) {
                this.medium = true
                this.hard = true
                this.very_hard = true
                this.tooltip = "Molto difficile"
            }
        }
    }
</script>

<style scoped>

    .difficuty-icon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: baseline;

        margin-bottom: 0.5rem;
    }

    .rectangle-easy {
        height: 15px;
        width: 8px;
        background-color: green;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-medium {
        height: 20px;
        width: 8px;
        background-color: yellow;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-hard {
        height: 25px;
        width: 8px;
        background-color: orange;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }

    .rectangle-very-hard {
        height: 30px;
        width: 8px;
        background-color: red;

        margin: 0.1rem;
        border-radius: 0.25rem;
        opacity: 0.65;
    }
</style>
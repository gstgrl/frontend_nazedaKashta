<template>
    <div class="card recipe-card" v-if="data.display">
        <img src="../../assets/background_img.jpg" class="card-img-top" alt="immagine della ricetta">
        <div class="card-body">
            <div class="title-difficulty-container">
                <RouterLink :to="`/recipes/${data.id}`"><h4 class="card-title">{{ data.title }}</h4></RouterLink>
                <span>
                    <Difficulty
                        :data="data.difficulty"
                    />
                </span>
            </div>

            <div class="description">
                <p v-if="!mobile">{{ data.description }}</p>
                <button type="button" class="btn orange-button-color my-2" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" :data-bs-content="data.description" v-if="mobile">Descrizione</button>
            </div>

            <div class="info">
                <PreparingTime :data="data.preparing_time" :mobile="mobile"/>
                <CookingTime :data="data.cooking_time" :mobile="mobile"/>
                <Calories :data="data.calories" :mobile="mobile"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Calories from './icons/calories.vue';
    import CookingTime from './icons/cookingTime.vue';
    import PreparingTime from './icons/preparingTime.vue';
    import Difficulty from './icons/difficulty.vue';


    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return{
                display: this.data.display,
                overflow_description: this.data.overflow_description,
                mobile: true
            }
        },
        mounted() {
            if (window.matchMedia("(min-width: 768px)").matches) {
                this.mobile = false
            }
        },
        components: {
            Calories,
            PreparingTime,
            CookingTime,
            Difficulty
        }
    }
</script>

<style scoped>
    .card {
        width: 15rem;
    }

    h5, h4 {
        margin: 0 !important;
    }

    .recipe-card {
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.5);
    }

    .title-difficulty-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .orange-button-color {
        width: 100%;
    }

    @media (min-width: 768px) {
        .card {
            width: 22rem;
        }
    }
</style>
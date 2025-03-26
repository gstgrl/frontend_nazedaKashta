<template>
    <div class="card recipe-card" v-if="data.display">
        <div class="card-img-container">
            <img :src="data.recipe_image" class="card-img-top" alt="immagine della ricetta">
            <span class="tag"><Tag :data="data.mealTag"/></span>
        </div>

        <div class="card-body">
            <div class="title-difficulty-container">
                <RouterLink :to="`/recipes/${data.id}`"><h4 class="card-title">{{ data.title }}</h4></RouterLink>
                <span>
                    <Difficulty
                        :data="data.difficulty"
                        :mobile="mobile"
                    />
                </span>
            </div>

            <div class="description">
                <p v-if="!mobile">{{ data.description }}</p>
                <button type="button" class="btn orange-button-color my-2" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" :data-bs-content="data.description" v-if="mobile">Descrizione</button>
            </div>

            <div class="info">
                <PreparingTime :data="data.preparing_Time" :mobile="mobile"/>
                <CookingTime :data="data.cooking_Time" :mobile="mobile"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CookingTime from './icons/cookingTime.vue';
    import PreparingTime from './icons/preparingTime.vue';
    import Difficulty from './icons/difficulty.vue';
    import Tag from './icons/tag.vue';


    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return{
                display: true,
                overflow_description: false,
                mobile: false,
                tag: "Colazione"
            }
        },
        components: {
            PreparingTime,
            CookingTime,
            Difficulty,
            Tag
        }
    }
</script>

<style scoped>
    .card {
        width: 15rem;
    }

    .card-img-container {
        position: relative;
    }

    .tag {
        position: absolute; /* Posizioniamo il tag sopra l'immagine */
        top: 10px; /* A 10px dal bordo superiore della card */
        right: 10px; /* A 10px dal bordo destro della card */
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
        justify-content: space-around;
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
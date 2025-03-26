<script setup>
    import { doc, deleteDoc, updateDoc } from "firebase/firestore";
    import { db } from "@/firebase";

    const deleted = ref(false)


    const deleteRecipe = async(id) => {
        const confirmed = window.confirm("Sei sicuro di voler eliminare questa ricetta?");

        if (confirmed) {
            try {
                await deleteDoc(doc(db, "Recipes", id)); // Modifica con il nome della tua collection
                deleted.value = true
                alert("Ricetta eliminata con successo!");

            } catch (error) {
                console.error("Errore nell'eliminazione:", error);
                alert("Errore durante l'eliminazione della ricetta.");
            }
        }
    }

    const hideRecipe = async(recipe) => {
        const recipeRef = doc(db, "Recipes", recipe.id); // Modifica con il nome della tua collection
        try {
            await updateDoc(recipeRef, { display: !recipe.display });
            recipe.display = !recipe.display; // Aggiorna lo stato localmente per modificare lo stato del bottone
        } catch (error) {
            console.error("Errore nell'aggiornamento:", error);
            alert("Errore durante la modifica della visibilità.");
        }
    }

</script>


<template>
    <div class="card recipe-card" :class="{deleted: deleted}">

        <div class="card-img-container">
            <img :src="data.recipe_image" class="card-img-top" alt="immagine della ricetta">
            <span class="tag"><Tag :data="data.mealTag"/></span>
        </div>
        
        <div class="card-body">
            <div class="title-difficulty-container">
                <RouterLink :to="`/recipes/${data.id}`"><h5 class="card-title">{{ data.title }}</h5></RouterLink>
                <span>
                    <Difficulty
                        :data="data.difficulty"
                        :mobile="mobile"
                    />
                </span>
            </div>

            <div class="description">
                <p>{{ data.description }}</p>
            </div>

            <div class="info">
                <PreparingTime :data="data.preparing_Time" :mobile="mobile"/>
                <CookingTime :data="data.cooking_Time" :mobile="mobile"/>
            </div>
        </div>

        <div class="modify-div">
            <button class="btn btn-dark" @click="hideRecipe(data)">{{ data.display ? "Nascondi": "Mostra" }}</button>
            <button class="btn btn-danger" @click="deleteRecipe(data.id)">Elimina</button>
        </div>
    </div>
</template>

<script>
    import CookingTime from '@/components/recipeComponents/icons/cookingTime.vue';
    import PreparingTime from '@/components/recipeComponents/icons/preparingTime.vue';
    import Difficulty from '@/components/recipeComponents/icons/difficulty.vue';
    import Tag from '@/components/recipeComponents/icons/tag.vue';
    import { ref } from "vue";


    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return{
                mobile: false
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

    .modify-div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 0.5rem;
    }

    .deleted {
        display: none; /* Riduce la visibilità */
    }

    @media (min-width: 768px) {
        .card {
            width: 22rem;
        }
    }
</style>
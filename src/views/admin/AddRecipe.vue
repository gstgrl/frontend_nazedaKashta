<script setup>
    //structural variables
    const step = ref(1)
    const page =  ref(1)
    const progress = ref(0) 

    //useful variables
    const file = ref(null)
    const recipeModified = ref(true)
    const progressMax = ref(6)
    const mobile = ref(false)
    const meals = [
        { tagText: "Colazione", backgroundColor: "#FFD700" }, // Giallo dorato
        { tagText: "Pranzo", backgroundColor: "#FF8C00" }, // Arancione
        { tagText: "Cena", backgroundColor: "#483D8B" }, // Blu notte
        { tagText: "Spuntino Mattutino", backgroundColor: "#6A5ACD" }, // Blu pervinca
        { tagText: "Spuntino Pomeridiano", backgroundColor: "#32CD32" }, // Verde lime
        { tagText: "Spuntino Serale", backgroundColor: "#8B0000" } // Rosso scuro
    ]

    //step variables
    const steps = ref([])
    const stepImage = ref("")
    const blobStepImage = ref("")
    const stepDescription = ref("")

    //ingredient variables
    const ingredientName = ref("")
    const ingredientQuantity = ref(0)
    const ingredientUnit = ref("")

    //recipe variables
    const title = ref("")
    const recipeDescription = ref("")
    const recipe_img = ref("")
    const mealTag = ref(null)
    const preparingTime = ref({
        type: "time",
        number: 0,
        unit: ''
    })
    const cookingTime = ref({
        type: "chef",
        number: 0,
        unit: ''
    })
    const difficulty = ref({
        type: "difficulty",
        number: 0,
        unit: ''
    })
    const ingredients = ref([])


    const uploadImages = async (event,  location) => {
        file.value = event.target.files[0];

        const formData = new FormData();
        formData.append("image", file.value);

        if(location == 'steps'){
            try {
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    { method: "POST", body: formData }
                );
                const data = await response.json();
                stepImage.value = data.data.url;
                const blobUrl = URL.createObjectURL(event.target.files[0])
                blobStepImage.value = blobUrl
                console.log("Immagine caricata:", blobStepImage.value);
            } catch (error) {
                console.error("Errore nell'upload:", error);
            }

        } else {
            try {
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    { method: "POST", body: formData }
                );
                const data = await response.json();
                recipe_img.value = data.data.url;
                console.log("Immagine caricata:", recipe_img.value, location);
            } catch (error) {
                console.error("Errore nell'upload:", error);
            }
        }
    }

    const sendRecipe = () => {
                const recipe = {
                    title: title.value,
                    description: recipeDescription.value,
                    recipe_image: recipe_img.value,
                    preparing_Time: preparingTime.value,
                    cooking_Time: cookingTime.value,
                    difficulty: difficulty.value,
                    ingredients: ingredients.value,
                    steps: steps.value,
                    meal_tag: mealTag.value,
                    display: true
                }

                saveRecipe(recipe)
            }

    const addStep = () => {
        const currentStep = {
            "number": step.value,
            "description": stepDescription.value,
            "url": stepImage.value,
            "blobImg": blobStepImage.value
        }

        steps.value.push(currentStep)
        step.value += 1

        clear(stepDescription, "")
        clear(stepImage, "")
        clear(blobStepImage, "")

    }

    const addIngredient = () => {
        const currentIngredient = {
            "ingredient": ingredientName.value,
            "quantity": ingredientQuantity.value,
            "unit": ingredientUnit.value
        }

        ingredients.value.push(currentIngredient)
        clear(ingredientName, "")
        clear(ingredientQuantity, 0)
        clear(ingredientUnit, "")

    }


    //Tecnical Methods

    const nextPage = () => {
        page.value += 1
        progress.value += 1
    }

    const previousPage = () => {
        page.value -= 1
        progress.value -= 1
    }

    const clear = (variable, initialValue) => {
        variable.value = initialValue
    }
</script>

<template>
    <div class="container">
        <div class="progress mb-4" role="progressbar" aria-label="Example 10px high" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="progressMax" style="height: 10px">
            <div class="progress-bar" :style="{width: progress*(100/progressMax) + '%'}"></div>
        </div>

        <div class="row">
            <!-- Sezione per la visualizzazione in tempo reale dei dati-->
            <div class="col-8  recipe-row">

                <h1>{{ title }}</h1>
                <p>{{ recipeDescription }}</p>

                <div class="row">
                    <div class="col-4 recipe-container" v-if="ingredients.length != 0">
                        <ul>
                            <li v-for="(ingredient) in ingredients"> {{ ingredient.quantity }} {{ ingredient.unit }} di <strong>{{ ingredient.ingredient }}</strong></li>
                        </ul>
                    </div>

                    <div class="col-4  recipe-container">
                        <Difficulty :data="difficulty" class="mx-auto"/>
                        <PreparingTime :data="preparingTime" :mobile="mobile"/>
                        <CookingTime :data="cookingTime" :mobile="mobile"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8" v-if="steps.length != 0">
                        <div class="stepContainerImages">
                            <div class="card mb-3" style="max-width: 540px;" v-for="(step, index) in steps"  :key="index">
                                <div class="row g-0">

                                    <div class="col-md-4">
                                        <img :src="step.blobImg" class="img-fluid rounded-start" alt="immagine procedimento">
                                    </div>

                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Step {{ step.number }}</h5>
                                            <p class="card-text">{{ step.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






            <!-- Sezione per l'aggiunta di dati-->

            <div class="col-4">
                <div v-if="page == 1">
                    <div class="mb-3">
                        <label for="formFileSm" class="form-label"><strong>Titolo della Ricetta</strong></label>
                        <input class="form-control mb-3" type="text" id="formFile" v-model="title">
                    </div>

                    <div class="mb-3">
                        <label for="formFile" class="form-label"><strong>Descrizione</strong></label>
                        <textarea class="form-control mb-3" type="text" id="formFile" v-model="recipeDescription"></textarea>
                    </div>

                    <div class="mb-5">
                        <label for="formFileSm" class="form-label"><strong>Scegli un'immagine per la ricetta</strong></label>
                        <input class="form-control form-control-sm  mb-3" type="file" id="formFile"  @change="uploadImages($event, 'recipeImg')">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">Tipologia di pasto</span>
                        <select v-model="mealTag" id="pasto" class="form-select">
                            <option v-for="meal in meals" :key="meal.tagText" :value="meal">
                                {{ meal.tagText }}
                            </option>
                        </select>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage" v-if="page != 1">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 2">
                    <!-- Form che aggiunge le informazioni riguardati la difficoltà, i tempi di cottura, preparazione e le calorie-->
                    <div class="mb-5">
                        
                        <label for="formFileSm" class="form-label"><strong>Aggiungi informazioni alla ricetta</strong></label>

                        <div class="input-group mb-3">
                            <span class="input-group-text">Tempi di preparazione</span>
                            <input class="form-control  form-control-sm" type="number" id="formFile" v-model="preparingTime.number" required>
                            <select class="form-select" aria-label="Default select example" v-model="preparingTime.unit" required>
                                <option value="min.">min.</option>
                                <option value="h.">h.</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">Tempi di cottura</span>
                            <input class="form-control  form-control-sm" type="number" id="formFile" v-model="cookingTime.number" required>
                            <select class="form-select" aria-label="Default select example" v-model="cookingTime.unit" required>
                                <option value="min.">min.</option>
                                <option value="h.">h.</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">Difficoltà</span>
                            <select class="form-select" aria-label="Default select example" v-model="difficulty.number" required>
                                <option :value="1">Facile</option>
                                <option :value="2">Media</option>
                                <option :value="3">Difficile</option>
                                <option :value="4">Molto difficile</option>
                            </select>
                        </div>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage" v-if="preparingTime.number && cookingTime.number && difficulty.number != 0">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 3">
                    <!-- Form che aggiunge gli ingredienti alla ricetta-->
                    <div class="mb-5">
                        <form @submit.prevent="addIngredient">
                            <label for="formFileSm" class="form-label"><strong>Aggiungi un'ingrediente</strong></label>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Ingrediente</span>
                                <input class="form-control  form-control-sm" type="text" id="formFile" v-model="ingredientName" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Quantità</span>
                                <input class="form-control  form-control-sm" type="number" id="formFile" v-model="ingredientQuantity" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Unità di misura</span>
                                <select class="form-select" aria-label="Default select example" v-model="ingredientUnit" required>
                                    <option value="g">g</option>
                                    <option value="hg">hg</option>
                                    <option value="Kg">Kg</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-success">Aggiungi</button>
                        </form>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 4">
                    <div class="mb-5">
                        <form @submit.prevent="addStep">
                            <label for="formFileSm" class="form-label"><strong>Aggiungi uno step</strong></label>

                            <div class="mb-3">
                                <label for="formFile" class="form-label">Descrizione</label>
                                <textarea class="form-control mb-3" type="text" id="formFile" v-model="stepDescription" required></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Aggiungi foto</label>
                                <input type="file" class="form-control" @change="uploadImages($event, 'steps')" accept="image/*" required/>
                            </div>

                            <button type="submit" class="btn btn-success" v-if="blobStepImage && stepImage !== ''">Aggiungi</button>
                        </form>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 5">
                    <div class="mb-5">
                        <button class="btn btn-success" @click="sendRecipe">Salva Ricetta</button>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import CookingTime from '@/components/recipeComponents/icons/cookingTime.vue';
    import Difficulty from '@/components/recipeComponents/icons/difficulty.vue';
    import PreparingTime from '@/components/recipeComponents/icons/preparingTime.vue';
    import { saveRecipe } from '@/firebase/firebaseFunctions';
    import { ref } from 'vue';
    //import { useDevice } from '@/javasciptFiles/isMobile';

    export default {
        components: {
            Difficulty,
            PreparingTime,
            CookingTime
        }
    }
</script>

<style scoped>
    .recipe-container {
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.5);
        border-radius: 1rem;
        padding: 0.5rem;
        margin: 0.5rem;
    }

    .stepContainerImages {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .recipe-row {
        justify-content: center;
    }
</style>
<script setup> 
    import { addItemToLocalStorage, clearAllLocalStorageItems, createLocalStorageVariables, returnValueFromLocalStorage } from '@/javasciptFiles/localStorage';
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
                <p>{{ description }}</p>

                <div class="row">
                    <div class="col-4 recipe-container" v-if="ingredients.length != 0">
                        <ul>
                            <li v-for="(item) in ingredients"> {{ item.quantity }} {{ item.unit }} di <strong>{{ item.ingredient }}</strong></li>
                        </ul>
                    </div>

                    <div class="col-4  recipe-container" v-if="recipeInfoChanged">
                        <Difficulty :data="difficulty" class="mx-auto"/>
                        <PreparingTime :data="preparing_time" :mobile="mobile"/>
                        <CookingTime :data="cooking_time" :mobile="mobile"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8" v-if="steps.length != 0">
                        <div class="stepContainerImages">
                            <div class="card mb-3" style="max-width: 540px;" v-for="(step, index) in steps"  :key="index">
                                <div class="row g-0">

                                    <div class="col-md-4">
                                        <img :src="step.url" class="img-fluid rounded-start" alt="immagine procedimento">
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
                        <textarea class="form-control mb-3" type="text" id="formFile" v-model="description"></textarea>
                    </div>

                    <div class="mb-5">
                        <label for="formFileSm" class="form-label"><strong>Scegli un'immagine per la ricetta</strong></label>
                        <input class="form-control form-control-sm  mb-3" type="file" id="formFile">
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage" v-if="page != 1">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 2">
                    <!-- Form che aggiunge le informazioni riguardati la difficoltà, i tempi di cottura, preparazione e le calorie-->
                    <div class="mb-5">
                        <form @submit.prevent="changeRecipeInfo">
                            <label for="formFileSm" class="form-label"><strong>Aggiungi informazioni alla ricetta</strong></label>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Tempi di preparazione</span>
                                <input class="form-control  form-control-sm" type="number" id="formFile" v-model="temporary_preparing_time.value" required>
                                <select class="form-select" aria-label="Default select example" v-model="temporary_preparing_time.unit" required>
                                    <option value="min.">min.</option>
                                    <option value="h.">h.</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Tempi di cottura</span>
                                <input class="form-control  form-control-sm" type="number" id="formFile" v-model="temporary_cooking_time.value" required>
                                <select class="form-select" aria-label="Default select example" v-model="temporary_cooking_time.unit" required>
                                    <option value="min.">min.</option>
                                    <option value="h.">h.</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Difficoltà</span>
                                <select class="form-select" aria-label="Default select example" v-model="temporary_difficulty.value" required>
                                    <option :value="1">Facile</option>
                                    <option :value="2">Media</option>
                                    <option :value="3">Difficile</option>
                                    <option :value="4">Molto difficile</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-success">Salva</button>
                        </form>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

                <div v-else-if="page == 3">
                    <!-- Form che aggiunge gli ingredienti alla ricetta-->
                    <div class="mb-5">
                        <form @submit.prevent="addIngredient">
                            <label for="formFileSm" class="form-label"><strong>Aggiungi un'ingrediente</strong></label>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Ingrediente</span>
                                <input class="form-control  form-control-sm" type="text" id="formFile" v-model="temporaryIngredientName" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Quantità</span>
                                <input class="form-control  form-control-sm" type="number" id="formFile" v-model="temporaryIngredientQuantity" required>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Unità di misura</span>
                                <select class="form-select" aria-label="Default select example" v-model="tempoaryIngredientUnit" required>
                                    <option value="g">g</option>
                                    <option value="hg">hg</option>
                                    <option value="Kg">Kg</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-success" >Aggiungi</button>
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
                                <textarea class="form-control mb-3" type="text" id="formFile" v-model="temporaryStepDescription" required></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Aggiungi foto</label>
                                <input type="file" class="form-control" @change="uploadImages" accept="image/*" required/>
                            </div>

                            <button type="submit" class="btn btn-success">Aggiungi</button>
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
    //import { useDevice } from '@/javasciptFiles/isMobile';

    export default {
        data() {
            return {
                mobile: false,
                progress: 0,
                progressMax: 6,
                recipeInfoChanged: false,
                page: 1,
                step: 1,

                // dati da mandare al database

                title: '',
                recipe_img: '', 
                description: '',

                preparing_time: {
                    type: "time",
                    value: 0,
                    unit: ''
                },
                cooking_time: {
                    type: "chef",
                    value: 0,
                    unit: ''
                },
                difficulty: {
                    type: "difficulty",
                    value: 0,
                    unit: ''
                },

                ingredients: [],
                steps: [],

                //Dati temporanei, utilizzati solamente durante il salvataggio e la modifica della ricetta

                temporaryIngredientName: '',
                temporaryIngredientQuantity: 0,
                tempoaryIngredientUnit: '',

                temporary_preparing_time: {
                    value: 0,
                    unit: ''
                },
                temporary_cooking_time: {
                    value: 0,
                    unit: ''
                },
                temporary_difficulty: {
                    value: 0
                },

                temporaryStepDescription: "",
                temporaryStepImage: ""
            }
        },
        methods: {
            addIngredient() {
                const ingredientToCreate = {
                    "ingredient": this.temporaryIngredientName,
                    "quantity": this.temporaryIngredientQuantity,
                    "unit": this.tempoaryIngredientUnit
                }

                this.ingredients.push(ingredientToCreate)

                this.temporaryIngredientName = ''
                this.temporaryIngredientQuantity= 0
                this.tempoaryIngredientUnit = ''
            },
            changeRecipeInfo() {

                this.preparing_time.unit =  this.temporary_preparing_time.unit
                this.cooking_time.unit = this.temporary_cooking_time.unit

                this.preparing_time.value =  this.temporary_preparing_time.value
                this.cooking_time.value = this.temporary_cooking_time.value
                this.difficulty.value = this.temporary_difficulty.value

                this.recipeInfoChanged = true

                this.temporary_cooking_time.unit = ''
                this.temporary_cooking_time.value = 0

                this.temporary_preparing_time.unit = ''
                this.temporary_preparing_time.value = 0

                this.temporary_difficulty.value = 0
            },
            addStep() {
                const currentStep = {
                    "number": this.step,
                    "description": this.temporaryStepDescription,
                    "url": this.temporaryStepImage
                }

                this.steps.push(currentStep)
                this.step += 1
                this.temporaryStepImage = " "
            },
            uploadImages(event) {
                const file = event.target.files[0]; // Ottieni tutti i file selezionati
                const imageUrl = URL.createObjectURL(file);
                this.temporaryStepImage = imageUrl
            },
            nextPage() {
                this.page += 1
                this.progress += 1
            },
            previousPage() {
                this.page -= 1
                this.progress -= 1
            },
            sendRecipe() {
                let recipe = {
                    title: this.title,
                    description: this.description,
                    recipe_image: this.recipe_img,
                    preparing_Time: this.preparing_time,
                    cooking_Time: this.cooking_time,
                    difficulty: this.difficulty,
                    ingredients: this.ingredients,
                    steps: this.steps
                }

                saveRecipe(recipe)
                clearAll()
            }
        },
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
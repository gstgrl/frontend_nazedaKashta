<script setup> 
    import { addItemToLocalStorage, clearAllLocalStorageItems, createLocalStorageVariables, returnValueFromLocalStorage } from '@/javasciptFiles/localStorage';
</script>

<template>
    <div class="container">
        <div class="row">
            <!-- Sezione per la visualizzazione in tempo reale dei dati-->
            <div class="col-8">

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
                        <Calories :data="calories" :mobile="mobile"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8" v-if="images.length != 0">
                        <div class="stepContainerImages">
                            <div v-for="(image, index) in images"  :key="index" class="col-md-3 text-center">
                                <img :src="image" class="img-thumbnail mb-2" style="max-width: 100px;">
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
                                <span class="input-group-text">Calorie ingerite</span>
                                <input class="form-control  form-control-sm" type="number" id="formFile" v-model="temporary_calories.value" required>
                                <select class="form-select" aria-label="Default select example" v-model="temporary_calories.unit" required>
                                    <option value="cal">cal</option>
                                    <option value="Kcal">Kcal</option>
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
                            <label for="formFileSm" class="form-label"><strong>Aggiungi un passaggio</strong></label>

                            <div class="mb-3">
                                <label for="formFile" class="form-label">Descrizione</label>
                                <textarea class="form-control mb-3" type="text" id="formFile" v-model="description"></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Aggiungi foto</label>
                                <input type="file" class="form-control" @change="uploadImages" accept="image/*" multiple/>
                            </div>

                            <button type="submit" class="btn btn-success">Aggiungi Step</button>
                        </form>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"@click="previousPage">Indietro</button>
                        <button type="button" class="btn btn-outline-primary" @click="nextPage">Avanti</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Calories from '@/components/recipeComponents/icons/calories.vue';
    import CookingTime from '@/components/recipeComponents/icons/cookingTime.vue';
    import Difficulty from '@/components/recipeComponents/icons/difficulty.vue';
    import PreparingTime from '@/components/recipeComponents/icons/preparingTime.vue';
    //import { useDevice } from '@/javasciptFiles/isMobile';

    export default {
        data() {
            return {
                mobile: false,
                recipeInfoChanged: false,
                page: 1,
                step: 1,


                title: '',
                recipe_img: '', 
                description: '',
                ingredients: [],
                images: [],

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
                calories: {
                    type: "kcal",
                    value: 0,
                    unit: ''
                },
                difficulty: {
                    type: "difficulty",
                    value: 0,
                    unit: ''
                },

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
                temporary_calories: {
                    value: 0,
                    unit: ''
                },
                temporary_difficulty: {
                    value: 0
                }
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
                this.calories.unit = this.temporary_calories.unit

                console.log(this.preparing_time, this.cooking_time, this.calories, this.difficulty.value)

                this.preparing_time.value =  this.temporary_preparing_time.value
                this.cooking_time.value = this.temporary_cooking_time.value
                this.calories.value = this.temporary_calories.value
                this.difficulty.value = this.temporary_difficulty.value

                this.recipeInfoChanged = true

                this.temporary_cooking_time.unit = ''
                this.temporary_cooking_time.value = 0

                this.temporary_calories.unit = ''
                this.temporary_calories.value = 0

                this.temporary_preparing_time.unit = ''
                this.temporary_preparing_time.value = 0

                this.temporary_difficulty.value = 0
            },
            addStep() {

            },
            uploadImages(event) {
                const files = event.target.files; // Ottieni tutti i file selezionati
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file.type.startsWith('image/')) {
                        const imageUrl = URL.createObjectURL(file);
                        this.images.push(imageUrl); // Aggiunge l'anteprima all'array
                    } else {
                    alert("Carica solo file immagine validi!");
                    }
                }
            },
            nextPage() {
                this.page += 1
            },
            previousPage() {
                this.page -= 1
            }
        },
        components: {
            Difficulty,
            PreparingTime,
            CookingTime,
            Calories
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
        flex-direction: row;
    }
</style>
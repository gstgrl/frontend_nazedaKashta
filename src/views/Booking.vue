<template>

    <div class="container my-5">
        <form @submit.prevent="submitForm" style="max-width: 40rem;">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingName" placeholder="Nome" v-model="formData.name" required>
                <label for="floatingInput">Nome</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingSurname" placeholder="Cognome" v-model="formData.surname" required>
                <label for="floatingPassword">Cognome</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingEmail" placeholder="Email" v-model="formData.email" required>
                <label for="floatingPassword">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="tel" class="form-control" id="floatingTelefono" placeholder="Telefono" v-model="formData.number" required>
                <label for="floatingPassword">Telefono</label>
            </div>

            <div class="radio-container mb-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Prima visita" v-model="formData.visit_type" required>
                    <label class="form-check-label" for="inlineRadio1">Prima visita</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Visita di controllo" v-model="formData.visit_type" required>
                    <label class="form-check-label" for="inlineRadio2">Visita di controllo</label>
                </div>
            </div>

            <select class="form-select mb-3" aria-label="Default select example" v-model="formData.office_selected" placeholder="Seleziona lo studio" required>
                <option disabled selected value="">Seleziona lo studio</option>
                <option v-for="(item, index) in offices_obj" :value="`${item.office_name}, ${item.address}`" :key="index">{{ item.office_name + ", " + item.address }}</option>
            </select>

            <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="formData.message"></textarea>
                <label for="floatingTextarea2">Comments</label>
            </div>


            <button type="submit" class="btn orange-button-color">INVIA</button>
        </form>

        <p class="mt-5 mb-1">oppure</p>

        <a href="https://www.nutridoc.it/nutrizionista/nazeda-kashta-1" class="btn btn-secondary">PRENOTA UNA VISITA TRAMITE NUTRIDOC</a>
    </div>
</template>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        max-width: 60rem;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .radio-container {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }
</style>

<script>
    import offices from '../json_files/offices.json'
    import axios from 'axios';

    export default {
        data() {
            return {
                formData: {
                    name: '',
                    surname: '',
                    email: '',
                    number: '',
                    office_selected: '',
                    visit_type: '',
                    message: ''
                },
                offices_obj: offices
            }
        },
        methods: {
            async submitForm() {
                try {
                    this.$router.replace('/thanks');
                    const response = await axios.post('http://127.0.0.1:5000/send-email-nazedaKashta', this.formData)
                    //const response = await axios.post('https://backend-decentralizzato.fly.dev/send-email-nazedaKashta', this.formData) //For debug 
                } catch (error) {
                    console.error('Errore durante l\'invio dell\'email:', error);
                    alert('Errore durante l\'invio.');
                }
            }
        }
    }
</script>
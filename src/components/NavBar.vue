<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>

    <nav class="navbar navbar-expand-lg bg-body-tertiary container" v-if="authState.isLoggedIn">
        <div class="container-fluid custom-container-navbar">
            <RouterLink to="/admin" class="navbar-brand">
                <img src="../assets/logo.png" alt="Logo" width="50">
            </RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav" style="flex-grow: unset;">
                <ul class="navbar-nav" style="margin-right: 2rem;">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/admin/addRecipe"><h6>Aggiungi Ricetta</h6></RouterLink>
                    </li>
                    <li class="nav-item hidden">
                        <RouterLink class="nav-link" to="/admin/recipeManagement"><h6>Gestione Ricette</h6></RouterLink>
                    </li>
                </ul>
                
                <button class="btn orange-button-color" @click="logout"><h6>LOGOUT</h6></button>
            </div>
        </div>
    </nav>

    

    <div class="banner" v-else>
        <nav class="navbar navbar-expand-lg bg-body-tertiary container">
            <div class="container-fluid custom-container-navbar">
                <RouterLink to="/" class="navbar-brand">
                    <img src="../assets/logo.png" alt="Logo" width="50">
                </RouterLink>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav" style="flex-grow: unset;">
                    <ul class="navbar-nav" style="margin-right: 2rem;">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/recipes"><h6>Ricettario</h6></RouterLink>
                        </li>
                        <li class="nav-item hidden">
                            <RouterLink class="nav-link disabled" to="/service"><h6>Servizi</h6></RouterLink>
                        </li>
                    </ul>
                    
                    <RouterLink class="btn orange-button-color" to="/booking"><h6>Prenota una Visita</h6></RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { authState } from '@/firebase/isLogged';
    import { signOut } from "firebase/auth";
    import { auth } from '@/firebase';

    export default {
        methods: {
            async logout() {
                try {
                    await signOut(auth); // Effettua il logout
                    this.$router.push("/"); // Reindirizza l'utente alla pagina di login
                } catch (error) {
                    console.error("Errore durante il logout:", error);
                }
            }
        }
    }
</script>

<style>
    .banner {
        background-image: url('../assets/background_img.jpg');
        background-size: cover; /* Fa in modo che l'immagine copra completamente l'area */
        background-position: center; /* Centra l'immagine */
        height: 500px;
    }

    .navbar {
        margin: 1rem auto;
        border-radius: 1rem;
    }

    
    h6 {
        margin: 0;
    }
</style>
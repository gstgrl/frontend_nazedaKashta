import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Services from '@/views/Services.vue';
import Booking from '@/views/Booking.vue';
import Recipes from '@/views/Recipes.vue';
import SingleRecipe from '@/views/SingleRecipe.vue';
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import AddRecipe from '@/views/admin/AddRecipe.vue';
import RecipeManagement from '@/views/admin/RecipeManagement.vue';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { authState } from '@/firebase/isLogged';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Dott.ssa Nazeda Kashta"
      },
    },
    {
      path: '/service',
      name: 'service',
      component: Services,
      meta: {
        title: "Servizi"
      },
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes,
      meta: {
        title: "Ricettario"
      },
    },
    {
      path: '/recipes/:id',
      component: SingleRecipe
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
      meta: {
        title: "Prenota una visita"
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "Login"
      },
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: Dashboard,
      meta: {
        title: "Dashboard",
        requiresAuth: true
      },
      children: [
        {
          path: "addRecipe",
          component: AddRecipe
        },
        {
          path: "recipeManagement",
          component: RecipeManagement
        }
      ]
    }
  ]
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title'; // Cambia il titolo della scheda
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (authState.isLoggedIn) {
      next();
    } else {
      next('/login'); // Reindirizza alla pagina di login
    }
  } else {
    next(); // Continua normalmente
  }
});


export default router
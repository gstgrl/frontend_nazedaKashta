import { reactive } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

// Oggetto reattivo per contenere lo stato dell'utente
export const authState = reactive({
  isLoggedIn: false,
  user: null,
});

// Listener per l'autenticazione
onAuthStateChanged(auth, (user) => {
  if (user) {
    authState.isLoggedIn = true;
    authState.user = user;
  } else {
    authState.isLoggedIn = false;
    authState.user = null;
  }
});

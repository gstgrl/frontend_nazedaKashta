import { db } from ".";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref } from "vue";


export async function saveRecipe(RecipeObject) {
    console.log(RecipeObject)
    try {
        const docRef = await addDoc(collection(db, "Recipes"), {
            title: RecipeObject.title,
            description: RecipeObject.description,
            recipe_image: RecipeObject.recipe_image,
            preparing_Time: RecipeObject.preparing_Time,
            cooking_Time: RecipeObject.cooking_Time,
            difficulty: RecipeObject.difficulty,
            ingredients: RecipeObject.ingredients,
            steps: RecipeObject.steps
        });
        console.log("Utente aggiunto con ID:", docRef.id);
    } catch (e) {
        console.error("Errore durante l'aggiunta: ", e);
    }
}

export async function extractRecipe(recipeID) {

    try {
        const docRef = doc(db, "Recipes", recipeID);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Dati ricetta:", docSnap.data());
          return docSnap.data();
        } else {
          console.log("Nessuna ricetta trovata!");
          return null;
        }
    } catch (error) {
        console.error("Errore nel recupero del documento:", error);
    }
}
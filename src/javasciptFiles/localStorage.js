let valuesArray = [ "title", "recipe_img", "description", "ingredients", "preparing_time", "cooking_time", "calories", "difficulty"]
let arrayVariablesLenght = valuesArray.length


export function addItemToLocalStorage(itemName, itemValue) {
    localStorage.setItem(itemName, JSON.stringify(itemValue))
}

export function returnValueFromLocalStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName))
}

export function clearAllLocalStorageItems() {
    localStorage.clear()
}


export function extractValuesFromLocalStorage(title, recipe_img, description, ingredients, preparing_time, cooking_time, calories, difficulty) {
    let variables = [title, recipe_img, description, ingredients, preparing_time, cooking_time, calories, difficulty]

    for(let g = 0; g < variables.length; g++) {
        let objFromLocalStorage = returnValueFromLocalStorage(valuesArray[g])

        if(valuesArray[g] == "preparing_time" || valuesArray[g] == "cooking_time" || valuesArray[g] == "calories" || valuesArray[g] == "difficulty") {
            variables[g].type = objFromLocalStorage.type
            variables[g].value = Number(objFromLocalStorage.value)
            variables[g].unit = objFromLocalStorage.unit
    
        } else{
            variables[g] = objFromLocalStorage
        }
    }
}


// Mi crea le variabili nel local storage in modo che possa utilizzarle in seguito, controlla se gia esiste una variabile nel local storage e se cosi non fosse la crea instanziandola come nuova avente le varibili inizializzate a zero
export function createLocalStorageVariables(preparing_time, cooking_time, calories, difficulty) {
    let variables = [preparing_time, cooking_time, calories, difficulty]

    for(let i = 0; i < arrayVariablesLenght; i++) {
        if(!localStorage.getItem(valuesArray[i])) {
            addItemToLocalStorage(valuesArray[i], variables[i])
        }
    }
}

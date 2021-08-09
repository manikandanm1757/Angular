import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    ingredientsAdded = new Subject<Ingredient>();
    onIngredientEdit = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Tomato', 10),
        new Ingredient('Onion', 10),
        new Ingredient('Rice', 1)
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredientByIndex(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(item: Ingredient) {
        this.ingredients.splice(0, 0, item);
        this.ingredientsAdded.next();
    }

    editIngredient(index: number, item: Ingredient) {
        this.ingredients[index] = item;
        this.ingredientsAdded.next();
    }

    deleteItem(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsAdded.next();
        this.onEditIngredient(-1);
    }

    addFromRecipe(items: Ingredient[]) {
        this.ingredients.push(...items);
        this.ingredientsAdded.next();
    }

    onEditIngredient(index: number): void {
        this.onIngredientEdit.next(index);
    }

}

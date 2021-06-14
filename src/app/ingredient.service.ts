import { EventEmitter, Injectable, Output } from "@angular/core";
import { Ingredient } from "./shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    @Output() ingredientsAdded = new EventEmitter<Ingredient>();
    ingredients: Ingredient[] = [
        new Ingredient('Tomato', 10),
        new Ingredient('Onion', 10),
        new Ingredient('Rice', 1)
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }
    addIngredient(item: Ingredient) {
        this.ingredients.splice(0, 0, item);
        this.ingredientsAdded.emit();
    }

    addFromRecipe(items: Ingredient[]) {
        this.ingredients.push(...items);
        this.ingredientsAdded.emit();
    }
}

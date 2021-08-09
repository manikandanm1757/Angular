import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { IngredientService } from "../ingredient.service";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    @Output() onItemSelect = new EventEmitter<Recipe>();
    recipesUpdate = new Subject<Recipe[]>();
    selectedRecipe: Recipe = null;
    recipes: Recipe[] = [
        new Recipe(
            'Recipe One',
            'This new recipe One', 'https://washington.org/sites/default/files/inline-images/ries-from-clydes.jpg',
            [
                new Ingredient('bread', 4),
                new Ingredient('Egg', 5)
            ]
        ),
        new Recipe('Recipe Two', 'This new recipe Two', 'https://washington.org/sites/default/files/inline-images/ries-from-clydes.jpg',
            [
                new Ingredient('bread', 4),
                new Ingredient('Egg', 5)
            ]
        )
    ];

    constructor(private ingredientService: IngredientService) {

    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    selectRecipe(item: Recipe): void {
        this.selectedRecipe = item;
        this.onItemSelect.emit(item);
    }

    getSelectedRecipe(): Recipe {
        return this.selectedRecipe;
    }

    getRecipeByIndex(index: number): Recipe {
        return this.recipes[index];
    }

    moveToIngredients(item: Ingredient[]) {
        this.ingredientService.addFromRecipe(item);
    }

    addRecipe(item: Recipe) {
        this.recipes.push(item);
        this.recipesUpdate.next(this.recipes.slice());
    }

    updateRecipe(index: number, item: Recipe) {
        this.recipes[index] = item;
        this.recipesUpdate.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesUpdate.next(this.recipes.slice());
    }


}

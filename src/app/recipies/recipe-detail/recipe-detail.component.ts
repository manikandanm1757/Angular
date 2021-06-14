import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getSelectedRecipe();
    this.recipeService.onItemSelect.subscribe((item: Recipe) => {
      this.recipe = item;
    });
  }

  moveToIngredients(): void {
    this.recipeService.moveToIngredients(this.recipe.ingredients);
  }

}

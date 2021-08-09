import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipies: Recipe[];
  selectedItem: Recipe;
  recipesSubscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipesUpdate.subscribe((items: Recipe[]) => {
      this.recipies = items;
    });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  onAdd(): void {
    this.router.navigate(['/recipes/new'])
  }
}

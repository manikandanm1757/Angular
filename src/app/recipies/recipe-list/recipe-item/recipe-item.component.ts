import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  selectedItem: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.selectedItem = this.recipeService.getSelectedRecipe();
    this.recipeService.onItemSelect.subscribe((item: Recipe) => {
      this.selectedItem = item;
    });
  }

  onItemClick(): void {
    this.recipeService.selectRecipe(this.recipe);
  }

}

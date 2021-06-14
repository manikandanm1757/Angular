import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private ingredientService: IngredientService) {

  }

  ngOnInit(): void {
      this.ingredients = this.ingredientService.getIngredients();
      this.ingredientService.ingredientsAdded.subscribe((item: Ingredient)=>{
        this.ingredients = this.ingredientService.getIngredients();
      });
  }
  onItemAdd(item) {
    this.ingredients.splice(0, 0, item);
  }
}

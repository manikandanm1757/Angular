import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientService } from '../ingredient.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  addSubscription: Subscription;
  editSubscription: Subscription;
  editIndex: number;
  constructor(private ingredientService: IngredientService) {

  }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredients();
    this.addSubscription = this.ingredientService.ingredientsAdded.subscribe((item: Ingredient) => {
      this.ingredients = this.ingredientService.getIngredients();
    });

    this.editSubscription = this.ingredientService.onIngredientEdit.subscribe((index: number) => {
      this.editIndex = index;
    });
  }

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe();
  }

  onItemAdd(item) {
    this.ingredients.splice(0, 0, item);
  }

  editItem(index: number): void {
    this.ingredientService.onEditIngredient(index);
  }
}

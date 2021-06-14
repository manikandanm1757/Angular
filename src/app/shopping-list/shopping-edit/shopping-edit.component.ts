import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IngredientService } from 'src/app/ingredient.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('name') nameInput: ElementRef;
 @ViewChild('amount') amountInput: ElementRef;
  name: string;
  amount: number;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {

  }

  onAdd() {
    const newIngredient = new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value,
    )
    this.ingredientService.addIngredient(newIngredient);
  }

  onDelete() {

  }

  onClear() {

  }

}

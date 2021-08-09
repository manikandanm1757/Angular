import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/ingredient.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') formElement: NgForm;
  editIndex: number;
  editMode: boolean = false;
  name: string;
  amount: number;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.onIngredientEdit.subscribe((index: number) => {
      this.editMode = index !== -1;
      this.editIndex = index;
      if (index !== -1) {
        this.formElement.setValue(this.ingredientService.getIngredientByIndex(index))
      } else {
        this.formElement.resetForm();
        this.formElement.setValue({
          name: '',
          amount: 1
        });
      }
    });
  }

  onAdd() {
    const newIngredient = new Ingredient(
      this.formElement.value.name,
      this.formElement.value.amount
    )
    this.editMode ? this.ingredientService.editIngredient(this.editIndex, newIngredient) : this.ingredientService.addIngredient(newIngredient);
  }

  onDelete() {
    this.ingredientService.deleteItem(this.editIndex);
  }

  onClear() {
    this.formElement.resetForm();
    this.formElement.setValue({
      name: '',
      amount: 1
    });
    this.ingredientService.onEditIngredient(-1);
  }

}

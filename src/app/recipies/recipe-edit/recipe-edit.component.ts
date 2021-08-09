import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    let name: string = '';
    let imagePath: string = '';
    let description: string = '';
    let ingredients: Ingredient[] = [];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = Boolean(params['id']);
      if (this.editMode) {
        const item: Recipe = this.recipeService.getRecipeByIndex(this.id);
        name = item.name;
        imagePath = item.imagePath;
        description = item.description;
        ingredients = item.ingredients || [];
      }

      this.recipeForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'imagePath': new FormControl(imagePath, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': new FormArray(ingredients.map(ing => {
          return new FormGroup({
            'name': new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount, Validators.required)
          });
        }))
      });

    });
  }

  onIngredientAdd() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    }));
  }

  onIngredientDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getIngControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    const recipe: Recipe = {
      name: this.recipeForm.value['name'],
      imagePath: this.recipeForm.value['imagePath'],
      description: this.recipeForm.value['description'],
      ingredients: this.recipeForm.value['ingredients'],
    };
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}

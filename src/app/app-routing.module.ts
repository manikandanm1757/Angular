import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeComponent } from './recipies/no-recipe/no-recipe.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipiesComponent,
    children: [
      { path: '', component: NoRecipeComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent},
      { path: ':id/edit', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', redirectTo: "/recipes", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



import { RecipeListComponent } from '../components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes = [
  { path: '', component: RecipeListComponent },
  { path: ':id', component: RecipeDetailComponent }
];

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    // Angular Material Modules
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line to handle custom elements
})
export class RecipesModule { }
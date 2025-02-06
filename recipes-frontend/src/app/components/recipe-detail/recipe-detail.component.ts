import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = false;
  error: string | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loading = true; // Set loading to true when fetching starts
      this.recipeService.getRecipeById(id).subscribe({
        next: (data) => {
          this.recipe = data;
          this.loading = false; // Set loading to false when data arrives
        },
        error: (error) => {
          console.error('Error fetching recipe:', error);
          this.loading = false; // Set loading to false on error too
        }
      });
    });
  }

  private loadRecipe(id: number): void {
    this.loading = true;
    this.recipeService.getRecipeById(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.recipe = data,
        error: (error) => this.error = error.message
      });
  }
}
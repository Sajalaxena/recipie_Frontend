import { Component, OnInit } from '@angular/core';
import { Recipe, SortOption } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  loading = false;
  error: string | null = null;
  selectedCuisine: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage = 0;
  pageSize = 6;
  cuisineTypes = ['Italian', 'Indian', 'Chinese', 'Mexican'];
  isLoading = true;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
    this.isLoading=false;
    this.loadRecipes();
   }

  loadRecipes(): void {
    this.loading = true;
    this.error = null;
    this.recipeService.getAllRecipes()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.recipes = data;
          this.filteredRecipes = data;
          this.updateDisplayedRecipes(); // Add this line to show initial recipes
        },
        error: (error) => {
          this.error = error.message;
        }
      });
  }

  updateDisplayedRecipes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // Use filteredRecipes instead of recipes for display
    this.displayedRecipes = this.filteredRecipes.slice(startIndex, endIndex);
  }

  onCuisineSelected(cuisine: string): void {
    this.selectedCuisine = cuisine;
    if (cuisine) {
      this.loading = true;
      this.recipeService.getRecipesByCuisine(cuisine)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (recipes) => {
            this.filteredRecipes = recipes;
            this.currentPage = 0;
            this.updateDisplayedRecipes();
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    } else {
      this.filteredRecipes = this.recipes;
      this.currentPage = 0;
      this.updateDisplayedRecipes();
    }
  }

  onSortingChanged(sortOrder: string): void {
    if (sortOrder !== 'none') {
      this.loading = true;
      this.recipeService.getSortedRecipes(sortOrder as 'asc' | 'desc')
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (recipes) => {
            this.filteredRecipes = recipes;
            this.currentPage = 0;
            this.updateDisplayedRecipes();
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    } else {
      this.filteredRecipes = this.recipes;
      this.currentPage = 0;
      this.updateDisplayedRecipes();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedRecipes();
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredRecipes.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
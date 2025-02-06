import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from '../models/recipe.interface';
import { environment } from '../../environment';
import { BehaviorSubject,switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = environment.apiUrl;
       private recipesLoaded = false;

    private recipes = new BehaviorSubject<any[]>([]);
      isLoading = new BehaviorSubject<boolean>(true);



  constructor(private http: HttpClient) { 
        this.loadInitialRecipes();

  }

   private loadInitialRecipes() {
    // First, make the POST request to load recipes
    this.http.post(`${this.apiUrl}/recipes/load`, {}).subscribe({
      next: () => {
        // After successful POST, make the GET request
        this.getAllRecipes().subscribe({
          next: (recipes) => {
            this.recipes.next(recipes);
            this.isLoading.next(false);
          },
          error: (error) => {
            console.error('Error getting recipes:', error);
            this.isLoading.next(false);
          }
        });
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        this.isLoading.next(false);
      }
    });
  }

  getAllRecipes() {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  getRecipes() {
    return this.recipes.asObservable();
  }

  // getAllRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     );
  // }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getRecipesByCuisine(cuisine: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/cuisine/${cuisine}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getSortedRecipes(order: 'asc' | 'desc'): Observable<Recipe[]> {
    const params = new HttpParams().set('order', order);
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/sorted`, { params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
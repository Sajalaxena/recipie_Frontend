export interface Recipe {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export interface SortOption {
  field: string;
  order: 'asc' | 'desc';
}
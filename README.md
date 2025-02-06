# Recipe Management Application

A full-stack web application for managing and discovering recipes. Built with Angular for the frontend and SpringBoot for the backend.

## 🚀 Features

- **Recipe Management**
  - View recipe listings with filters
  - Detailed recipe information
  - Add new recipes
  - Edit existing recipes
  - Delete recipes

- **Recipe Filtering**
  - Filter by cuisine type
  - Sort by calories (ascending/descending)
  - Search functionality

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for different screen sizes

## 🛠️ Tech Stack

### Frontend
- Angular 16
- SCSS
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## 📦 Installation

1. **Clone the repository**
git clone https://github.com/Sajalaxena/recipie_Frontend.git
cd recipes-frontend
npm install
ng serve



## 📝 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

## 🎯 Usage

1. **View Recipes**
   - Browse through the recipe list
   - Click on a recipe to view details

2. **Filter Recipes**
   - Use the navbar to filter by cuisine
   - Sort recipes by calories

3. **Manage Recipes**
   - Add new recipes using the "Add Recipe" button
   - Edit recipes through the recipe detail page
   - Delete recipes using the delete button

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() cuisineSelected = new EventEmitter<string>();
  @Output() sortingChanged = new EventEmitter<string>();


//Dropdown Values 
  cuisineTypes = ['All', 'Italian', 'Indian', 'Chinese', 'Mexican', 'Japanese'];
  sortOptions = [
    { value: 'none', label: 'None' },
    { value: 'asc', label: 'Calories: Low to High' },
    { value: 'desc', label: 'Calories: High to Low' }
  ];

    activeDropdown: string | null = null;
     selectedCuisine: string = 'All'; 
  selectedSort: string = 'none'; 

  toggleDropdown(dropdownName: string) {
    // If clicking the same dropdown, close it
    if (this.activeDropdown === dropdownName) {
      this.activeDropdown = null;
    } else {
      // If clicking a different dropdown, open it
      this.activeDropdown = dropdownName;
    }
  }

  //On change of cusisine emit the value
  onCuisineChange(cuisine: string): void {
     this.selectedCuisine = cuisine;
    this.cuisineSelected.emit(cuisine === 'All' ? '' : cuisine);
     this.activeDropdown = null;
  }

    //On change of sorting order emit the value
  onSortChange(sortOrder: string): void {
    this.selectedSort = sortOrder;   
    this.sortingChanged.emit(sortOrder);
    this.activeDropdown = null;
  }

 //Show the selected label in dropdown
   getSelectedSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.selectedSort);
    return option ? option.label : 'Sort by Calories';
  }
}
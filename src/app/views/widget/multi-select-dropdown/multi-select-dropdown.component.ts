import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  standalone: true, // Mark the component as standalone,
  imports:[CommonModule]
})
export class MultiSelectDropdownComponent {
  @Input() options: string[] = [];
  @Input() selectedItems: string[] = [];
  @Output() selectedItemsChange = new EventEmitter<string[]>();

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSelection(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.selectedItemsChange.emit(this.selectedItems);
  }

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}

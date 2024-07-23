import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ClickOutsideDirective } from '../click-outside.directive'; // Import the directive

interface Option {
  text: string;
  value: string;
}

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective]
})
export class MultiSelectDropdownComponent {
  @Input() options: Option[] = [];
  @Input() selectedItems: Option[] = [];
  @Output() selectedItemsChange = new EventEmitter<Option[]>();

  dropdownOpen = false;

  get selectedItemsText(): string {
    return this.selectedItems.map(item => item.text).join(', ');
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  toggleSelection(option: Option, event?: Event) {
    event?.stopPropagation(); // Prevent event bubbling

    const index = this.selectedItems.findIndex(item => item.value === option.value);

    if (index === -1) {
      this.selectedItems.push(option);
    } else {
      this.selectedItems.splice(index, 1);
    }

    this.selectedItemsChange.emit(this.selectedItems);
  }

  isSelected(option: Option): boolean {
    return this.selectedItems.some(item => item.value === option.value);
  }
}

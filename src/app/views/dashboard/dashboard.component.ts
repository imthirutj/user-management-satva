import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common'; 
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  ModalModule , NavComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';


interface IUser {
  username: string;
  password: string;
  products: string[];
  companyType: string[];
  company: string;
  emailAddress: string;
  position: string;
  userType: string[];
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule,NavComponent,ModalModule,WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {
  public userForm: FormGroup;
  selectedUser: any;
  public formVisible:Boolean = false;
  activeTab = 'loginDetails';
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      products: [''],
      companyType: [''],
      company: [''],
      emailAddress: [''],
      position: [''],
      userType: ['']
    });
  }

  public users: IUser[] = [
    {
      username: 'john_doe',
      password: 'password123',
      products: ['ParametricFuelPro', 'ParametricEUAPro'],
      companyType: ['Insurance Broker (IB)'],
      company: 'ABC Company',
      emailAddress: 'john.doe@example.com',
      position: 'Developer',
      userType: ['Admin', 'Normal user']
    },
    {
      username: 'jane_smith',
      password: 'password456',
      products: ['EmissionsPro'],
      companyType: ['Insurance Company (IC)'],
      company: 'XYZ Corporation',
      emailAddress: 'jane.smith@example.com',
      position: 'Designer',
      userType: ['Normal user']
    },
  ];

  ngOnInit(): void {
  }
  openModal() {
    const modalElement = document.getElementById('userModal') as HTMLElement;
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
  }

  closeModal() {
    const modalElement = document.getElementById('userModal') as HTMLElement;
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  trackByUsername(index: number, user: any) {
    return user.username;
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission
      console.log(this.userForm.value);
      this.closeModal();
    }
  }

  
}

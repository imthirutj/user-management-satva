import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  ModalModule,
  NavComponent, ModalService
} from '@coreui/angular';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { NgSelectModule } from '@ng-select/ng-select';

import { MultiSelectDropdownComponent } from '../widget/multi-select-dropdown/multi-select-dropdown.component';

declare var $: any;  // Import jQuery

export enum CompanyType {
  InsuranceBroker = 'Insurance Broker (IB)',
  InsuranceCompany = 'Insurance Company (IC)',
  InsuranceShipOwnerOperator = 'Insurance Ship Owner/Operator (ISOO)',
  Lender = 'Lender (L)',
  ShipOwnerOperator = 'Ship Owner/Operator (SOO)',
  ShipCharterer = 'Ship Charterer (SC)'
}

export enum ProductType {
  ParametricFuelPro = '1',
  ParametricEUAPro = '2',
  EmissionsPro = '3',
  FleetPro = '4',
  ShipPro = '5'
}

interface ICompany {
  id: string;
  name: string;
  companyType: CompanyType;
  products: ProductType[];
  regNo: string;
  companyAddress: string;
  status: boolean;
}

export interface Option {
  text: string;
  value: string;
}

@Component({
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss'],
  standalone: true,
  imports: [CommonModule,
    NavComponent,
    ModalModule,
    TextColorDirective, CardComponent,
    CardBodyComponent, RowComponent, ColComponent,
    ButtonDirective, IconDirective, ReactiveFormsModule, FormsModule,
    ButtonGroupComponent, FormCheckLabelDirective,
    ChartjsComponent, NgStyle, CardFooterComponent,
    GutterDirective, ProgressBarDirective, ProgressComponent,
    CardHeaderComponent, TableDirective,
    AvatarComponent, NgSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MultiSelectDropdownComponent]
})
export class OrganizationComponent implements OnInit {

  public companyForm: FormGroup;
  public selectedCompany: ICompany | null = null;  // For editing
  public productOptions: Option[] = [
    { text: 'Parametric Fuel Pro', value: ProductType.ParametricFuelPro },
    { text: 'Parametric EUA Pro', value: ProductType.ParametricEUAPro },
    { text: 'Emissions Pro', value: ProductType.EmissionsPro },
    { text: 'Fleet Pro', value: ProductType.FleetPro },
    { text: 'Ship Pro', value: ProductType.ShipPro }
  ];
  public companyTypes = Object.values(CompanyType); // For company type dropdown
  public isModalOpen = false; // To control modal visibility

  public modalVisible: boolean = false;

  public selectedItems: Option[] = [];

  onSelectionChange(selectedItems: Option[]): void {
    this.companyForm.patchValue({ products: selectedItems.map(item => item.value) });
  }

  public companies: ICompany[] = [
    {
      id: '1',
      name: 'Tech Innovations Inc.',
      companyType: CompanyType.InsuranceBroker,
      products: [ProductType.EmissionsPro, ProductType.ParametricFuelPro],
      regNo: 'TECH123456',
      companyAddress: '123 Silicon Valley, Tech City, CA 94043',
      status: true
    },
    {
      id: '2',
      name: 'Green Earth Ltd.',
      companyType: CompanyType.ShipCharterer,
      products: [ProductType.EmissionsPro, ProductType.ParametricFuelPro],
      regNo: 'GREEN987654',
      companyAddress: '456 Greenway, Eco Town, TX 75001',
      status: false
    },
    {
      id: '3',
      name: 'Health Plus Co.',
      companyType: CompanyType.InsuranceCompany,
      products: [ProductType.EmissionsPro, ProductType.ParametricFuelPro],
      regNo: 'HEALTH112233',
      companyAddress: '789 Wellness Drive, Health City, FL 33101',
      status: true
    },
    {
      id: '4',
      name: 'Finance Pros LLC',
      companyType: CompanyType.Lender,
      products: [ProductType.EmissionsPro, ProductType.ParametricFuelPro],
      regNo: 'FINANCE556677',
      companyAddress: '101 Financial St., Moneyville, NY 10001',
      status: true
    },
    {
      id: '5',
      name: 'EduWorld Academy',
      companyType: CompanyType.ShipOwnerOperator,
      products: [ProductType.EmissionsPro, ProductType.ParametricFuelPro],
      regNo: 'EDU891011',
      companyAddress: '202 Knowledge Ave, Learn City, IL 60601',
      status: false
    }
  ];

  private dialogRef: MatDialogRef<any> | null = null;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private modalService: ModalService) {
    this.companyForm = this.fb.group({
      id: [''],
      name: [''],
      companyType: [''],
      products: this.fb.array([]),
      regNo: [''],
      companyAddress: [''],
      status: [false]
    });
  }

  ngOnInit(): void { }

  openModal(company?: ICompany): void {
    this.selectedCompany = company || null;

    // Update the selectedItems if editing a company
    this.selectedItems = company ? this.productOptions.filter(option => company.products.includes(option.value as ProductType)) : [];

    this.companyForm.reset({
      id: company ? company.id : '',
      name: company ? company.name : '',
      companyType: company ? company.companyType : '',
      products: company ? company.products : [],
      regNo: company ? company.regNo : '',
      companyAddress: company ? company.companyAddress : '',
      status: company ? company.status : false
    });

    this.modalVisible = true;
    this.modalService.toggle({ show: true, id: 'company-modal' });
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  save(): void {
    if (this.companyForm.valid) {
      const formValue = this.companyForm.value;
      if (this.selectedCompany) {
        // Update existing company
        Object.assign(this.selectedCompany, formValue);
        console.log('submit exis:', this.selectedCompany)
      } else {
        // Add new company
        this.companies.push(formValue);
        console.log('submit:', this.companies)
      }
      this.closeModal();
    }
  }
}

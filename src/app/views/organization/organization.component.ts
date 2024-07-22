import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormsModule,FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  NavComponent
} from '@coreui/angular';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompanyDialogComponent } from '../pages/company-dialog/company-dialog.component';  // Adjust the path if necessary


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
  ParametricFuelPro = 'ParametricFuelPro',
  ParametricEUAPro = 'ParametricEUAPro',
  EmissionsPro = 'EmissionsPro',
  FleetPro = 'FleetPro',
  ShipPro = 'ShipPro'
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

@Component({
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss'],
  standalone: true,
  imports: [CommonModule,
    NavComponent,
    ModalModule,
    WidgetsDropdownComponent,
    TextColorDirective, CardComponent,
    CardBodyComponent, RowComponent, ColComponent,
    ButtonDirective, IconDirective, ReactiveFormsModule,FormsModule,
    ButtonGroupComponent, FormCheckLabelDirective,
    ChartjsComponent, NgStyle, CardFooterComponent,
    GutterDirective, ProgressBarDirective, ProgressComponent,
    WidgetsBrandComponent, CardHeaderComponent, TableDirective,
    AvatarComponent, NgSelectModule,
   MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,]
})


export class OrganizationComponent implements OnInit {
  public companyForm: FormGroup;
  public selectedCompany: ICompany | null = null;  // For editing
  public productOptions = Object.values(ProductType); // For multi-select options
  public companyTypes = Object.values(CompanyType); // For company type dropdown


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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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

 

  ngOnInit(): void {
  }

  openModal(company?: ICompany): void {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '500px',
      data: { company: company || {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (company) {
          // Update existing company
          Object.assign(company, result);
        } else {
          // Add new company
          this.companies.push(result);
        }
      }
    });
  }
}

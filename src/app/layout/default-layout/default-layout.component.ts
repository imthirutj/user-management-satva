import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common'; 
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective, SpinnerModule
} from '@coreui/angular';

import { DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { LoadingService } from '../../loading.service';
import { Router } from '@angular/router';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    SpinnerModule,
    CommonModule
  ]
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public  name:string = "a";
  public isLoading: boolean; // Example property for loading state

  constructor(private router: Router, public loadingService: LoadingService) {
    // Initialize properties or subscribe to observables here
    this.isLoading = false; // Example initialization
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}

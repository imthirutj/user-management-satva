import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../data.service';
import { FormsModule } from '@angular/forms'; 

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
      ContainerComponent,
      RowComponent,
      ColComponent,
      CardGroupComponent,
      TextColorDirective,
      CardComponent,
      CardBodyComponent,
      FormDirective,
      InputGroupComponent,
      InputGroupTextDirective,
      IconDirective,
      FormControlDirective,
      ButtonDirective,
      NgStyle,
      FormsModule
  ]
})
export class LoginComponent {

  constructor(private router: Router, private snackBar: MatSnackBar, private dataService:DataService) {}

  
  userName: string = '';
  password: string = '';

  onLogin(){
    this.dataService.login(this.userName, this.password).subscribe(
      (response: any) => {
        console.log('Login successful');
        const authToken = response.token;
        this.dataService.setAuthToken(authToken);
        this.snackBar.open('Login Success', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/home/dashboard']);
      },
      error => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed', 'Close', {
          duration: 5000,
        });
      }
    );
   
  }
}

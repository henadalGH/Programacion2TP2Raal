import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServicio } from './login-servicio';



@Component({
  selector: 'app-login',
  imports: [FormsModule ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [LoginServicio]
})
export class LoginComponent {
  email: string = '';
  password: string = ''; 
  error: String = '';
form: any;
  

  constructor( private router: Router, private loginS: LoginServicio) {}

  login(): void{
    console.log('Datos de login: ', this.email, this.password);

      
    this.loginS.login(this.email, this.password).subscribe(
      (Response) => {
        localStorage.setItem('email', this.email);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.error('Error de login', error);
        alert('Corero o contraseña incorecta');
      }
    );
  }
  }{}
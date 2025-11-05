import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServicio } from './login-servicio';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [LoginServicio]
})
export class LoginComponent {
  email: string = '';
  password: string = ''; 
  error: string = '';

   private loggedIn: BehaviorSubject<string> = new BehaviorSubject<string>('');

  

  constructor(private router: Router, private loginS: LoginServicio) {
    
  }

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }


  login(): void {
    // Validación básica antes de enviar
    if (!this.email || !this.password) {
      this.error = 'Debe completar todos los campos.';
      return;
    }

    console.log('Datos enviados al backend:', this.email, this.password);

    this.loginS.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.success) {

          localStorage.setItem('email', response.usuario.email);
          this.router.navigate(['/inicio']);
          this.loggedIn.next(response.usuario.email);
        } else {
          this.error = response.message || 'Credenciales incorrectas.';
        }
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        this.error = 'Error al conectar con el servidor.';
      }
    });
  }
}

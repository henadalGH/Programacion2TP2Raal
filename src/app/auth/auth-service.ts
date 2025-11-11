import { Injectable } from '@angular/core';
import { LoginServicio } from '../login/login-servicio';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  constructor(private router: Router,
    private loginServi: LoginServicio
  ){}


  get isLooggedIn(){
    return this.loggedIn.asObservable();
  }
  
  login(email: string, passwod: string) {
    return this.loginServi.login(email, passwod).pipe(
      tap((response: any) => {
        if(response && response.success){
          this.loggedIn.next(email);
          localStorage.setItem('email', email);
          localStorage.setItem('rol', response.rol);
          
          this.router.navigate(['/inicio']);
        }
        else {
          alert('usuario o contraseña incorrecto')
        }
      }
    )); 
  }

  getRoles() : String | null{
    return localStorage.getItem('rol')

  }
  

}

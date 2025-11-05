import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})


export class Header {

  constructor( private router: Router){

  }
  
  private loggedIn: BehaviorSubject<string> = new BehaviorSubject<string>('');
    
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  
  logout() {
    this.loggedIn.next('');
    this.router.navigate(['/login']);
  }


title = "Bienvenidos";
ButName="Ocultar";
  public navVisible: boolean= true;
  
  barra ():void {
    if (this.navVisible = !this.navVisible) {
      this.ButName="Ocultar";
    } else{
      this.ButName="Mostrar"
    }
    
  }
}

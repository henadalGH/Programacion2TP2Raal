import { Component, OnInit } from '@angular/core';
import { SucursalesServicio } from './sucursales-servicio';
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth-service';


@Component({
  selector: 'app-sucursales',
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, RouterLinkWithHref], 
  templateUrl: './sucursales.html',
  styleUrls: ['./sucursales.css'], 
  providers: [SucursalesServicio]
})
export class Sucursales implements OnInit {

form!: FormGroup;
isAdmin: boolean = false;

  

  
  constructor( 
    private httpServicio: SucursalesServicio,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar rol del usuario
    const rol = this.authService.getRoles();
    this.isAdmin = rol === 'role_admin';
    
    this.obtenerSucursales();
  }
    
    sucursales: any[] = [];
    

obtenerSucursales(){
  this.httpServicio.obtenerSucursales().subscribe((sucursales : any) => {
    this.sucursales = sucursales;
  });
}


public navVisible: boolean= true;
  protected title = 'proy25';
  barra ():void {this.navVisible = !this.navVisible;}

}
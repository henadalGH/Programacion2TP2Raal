import { Component, OnInit } from '@angular/core';
import { SucursalesServicio } from './sucursales-servicio';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-sucursales',
  imports: [RouterOutlet], 
  templateUrl: './sucursales.html',
  styleUrls: ['./sucursales.css'], 
  providers: [SucursalesServicio]
})
export class Sucursales implements OnInit {
  
  constructor( private httpServicio: SucursalesServicio)
  {}

  ngOnInit(): void {

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


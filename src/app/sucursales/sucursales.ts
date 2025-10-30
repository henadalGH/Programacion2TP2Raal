import { Component, OnInit } from '@angular/core';
import { SucursalesServicio } from './sucursales-servicio';


@Component({
  selector: 'app-sucursales',
  imports: [], 
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
  }


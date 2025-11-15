import { Component, OnInit } from '@angular/core';
import {RouterLink } from '@angular/router';
import { SucursalesServicio } from '../sucursales/sucursales-servicio';


@Component({
  selector: 'app-principal',
  imports: [RouterLink],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal implements OnInit {

  constructor(private httpServicio: SucursalesServicio){

  }
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

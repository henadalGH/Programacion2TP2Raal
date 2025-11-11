import { Component, OnInit } from '@angular/core';
import { SucursalesServicio } from './sucursales-servicio';
import { RouterOutlet } from "@angular/router";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sucursales',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule], 
  templateUrl: './sucursales.html',
  styleUrls: ['./sucursales.css'], 
  providers: [SucursalesServicio]
})
export class Sucursales implements OnInit {

form!: FormGroup;


  /* nSubmit(nombre_suc: string, direccion: string, empleados: number) {
    return this.httpServicio.agregarSucursal(nombre_suc, direccion, 
      empleados); 
} */

  
  constructor( private httpServicio: SucursalesServicio)
  {}

  ngOnInit(): void {

    this.obtenerSucursales();
  }
    
    sucursales: any[] = [];
    nombreSuc: string = '';
    direccion: string = '';
    empleados: number = 0;

obtenerSucursales(){
  this.httpServicio.obtenerSucursales().subscribe((sucursales : any) => {
    this.sucursales = sucursales;
  });
}


public navVisible: boolean= true;
  protected title = 'proy25';
  barra ():void {this.navVisible = !this.navVisible;}

}
import { Component, OnInit } from '@angular/core';
import { ClienteServicio } from './cliente-servicio';

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
  providers: [ClienteServicio]
})
export class Clientes implements OnInit{
  
  constructor(private httpServicio: ClienteServicio){
    
  }

  ngOnInit(): void {
    this.obtenerCliente();
  }

clientes2: any[] = [];

obtenerCliente(){
  this.httpServicio.obtenerClientes().subscribe((respuesta : any) => {
    this.clientes2 = respuesta;
  });
}
}

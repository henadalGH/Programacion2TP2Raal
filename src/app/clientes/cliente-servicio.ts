import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClienteServicio {
  
  constructor(private httpClinte: HttpClient) { 
  }
    
  obtenerClientes()
    {
      return this.httpClinte.get('http://localhost/Programacion%202/Clientes.php');
    }
  }

  //agregar el grafico a las ventas con una libreria 

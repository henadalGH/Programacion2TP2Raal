import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VentasServicio {

  constructor(private httpClint: HttpClient) { 
    
    }


    ObtenerVentas()
    {
      return this.httpClint.get('http://localhost/Programacion%202/Venta.php');
    }

    obtenerMeses(){
    return this.httpClint.get('http://localhost/Programacion%202/Meses.php');
  }
  
}

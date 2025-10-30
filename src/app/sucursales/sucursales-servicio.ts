import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SucursalesServicio {


  constructor(private http : HttpClient) { }

  obtenerSucursales(){
    return this.http.get('http://localhost/Programacion%202/Sucursales.php');
  }
}

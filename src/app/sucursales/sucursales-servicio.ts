import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SucursalesServicio {

  private urlApi = 'http://localhost/Programacion%202/Sucursales.php'

  constructor(private http : HttpClient) { }

  obtenerSucursales(){
    return this.http.get(this.urlApi);
  }


  agregarSucursal(nombre: string, direccion: string, empleado: number): Observable<any> {
    return this.http.post<any>(this.urlApi, {
      nombre: nombre,
      direccion: direccion,
      empleado: empleado
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasServicio {

  private urlApi = 'http://localhost/Programacion%202/Venta.php';

  constructor(private httpClient: HttpClient) { }

  ObtenerVentas() {
    return this.httpClient.get(this.urlApi);
  }

  obtenerMeses() {
    return this.httpClient.get('http://localhost/Programacion%202/Meses.php');
  }

  editarVenta(columna: string, fila: number, nuevoValor: number): Observable<any> {
    return this.httpClient.post<any>(this.urlApi, {
      columna: columna,
      fila: fila,
      nuevo_valor: nuevoValor
    });
  }
} 

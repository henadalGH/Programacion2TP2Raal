import { Component, OnInit } from '@angular/core';
import { VentasServicio } from './ventas-servicio';
import { SucursalesServicio } from '../sucursales/sucursales-servicio';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  standalone: true,
  styleUrls: ['./ventas.css'],
  providers: [VentasServicio, SucursalesServicio]
})
export class Ventas implements OnInit {

  ventaMes: any[] = [];
  Suc: any[] = [];
  Mes: any[] = [];
  tablaHTML: string = '';
  chart: Chart | null = null; 

  constructor(
    private httpVentas: VentasServicio,
    private httpSucursales: SucursalesServicio
  ) {}

  ngOnInit(): void {
    this.obtenerSucursales();
    this.obtenerMeses();
    this.obtenerVentasSucursales();
  }

  crearGrafico(button: string = 'boton1') {
    const labels = this.Mes.map(m => m.Mes);
    const datasets: any[] = [];

    for (let s = 0; s < this.Suc.length; s++) {
      const ventasSuc: number[] = [];
      for (let m = 0; m < this.Mes.length; m++) {
        ventasSuc.push(this.ventaMes[m][`Suc${s + 1}`]);
      }

      datasets.push({
        label: this.Suc[s].Nombre_Suc,
        data: ventasSuc,
        fill: false,
        borderColor: `hsl(${(s * 137.5 + 50) % 360}, 70%, 45%)`,
        backgroundColor: `hsl(${(s * 137.5 + 20) % 360}, 80%, 40%)`,
        tension: 0.1
      });
    }

    // Destruir gráfico previo si existe
    if (this.chart) {
      this.chart.destroy();
    }

    const tipoGrafico: 'line' | 'bar' = button === 'boton1' ? 'line' : 'bar';

    const config: ChartConfiguration = {
      type: tipoGrafico,
      data: { labels, datasets },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    };

    this.chart = new Chart('grafico', config);
  }

  obtenerVentasSucursales() {
    this.httpVentas.ObtenerVentas().subscribe((ventas: any) => {
      this.ventaMes = ventas;
      this.generarTabla();
      if (this.Suc.length > 0 && this.Mes.length > 0) {
        this.crearGrafico('boton1'); // Gráfico inicial
      }
    });
  }

  obtenerSucursales() {
    this.httpSucursales.obtenerSucursales().subscribe((suc: any) => {
      this.Suc = suc;
      this.generarTabla();
    });
  }

  obtenerMeses() {
    this.httpVentas.obtenerMeses().subscribe((mes: any) => {
      this.Mes = mes;
    });
  }

  generarTabla() {
    let tablaHTML = '<table border="1">';
    tablaHTML += '<tr><th>Mes / Sucursal</th>';

    for (let f = 0; f < this.Suc.length; f++) {
      tablaHTML += `<th>${this.Suc[f].Nombre_Suc}</th>`;
    }

    for (let m = 0; m < this.Mes.length; m++) {
      tablaHTML += '<tr>';
      tablaHTML += `<th>${this.Mes[m].Mes}</th>`;
      for (let f = 0; f < this.Suc.length; f++) {
        tablaHTML += `<td>${this.ventaMes[m][`Suc${f + 1}`]}</td>`;
      }
      tablaHTML += '</tr>';
    }

    tablaHTML += '</table>';
    return tablaHTML;
  }
}

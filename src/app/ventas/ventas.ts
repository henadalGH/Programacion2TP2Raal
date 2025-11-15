import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasServicio } from './ventas-servicio';
import { SucursalesServicio } from '../sucursales/sucursales-servicio';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./ventas.css'],
  providers: [VentasServicio, SucursalesServicio]
})
export class Ventas implements OnInit {

  ventaMes: any[] = [];
  Suc: any[] = [];
  Mes: any[] = [];
  tablaHTML: string = '';
  chart: Chart | null = null;
  selectedSuc: boolean[] = []; // estado de selección de sucursales
  
  // Variables para edición
  editando: { mes: number; suc: number } | null = null;
  valorTemporal: number = 0;

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
      // solo incluir sucursales seleccionadas
      if (!this.isSelected(s)) continue;
      const ventasSuc: number[] = [];
      for (let m = 0; m < this.Mes.length; m++) {
        const row = this.ventaMes[m] || {};
        const val = row[`Suc${s + 1}`];
        ventasSuc.push(typeof val === 'number' || !isNaN(Number(val)) ? Number(val) : 0);
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
      if (this.Suc.length > 0 && this.Mes.length > 0) {
        this.crearGrafico('boton1'); // Gráfico inicial
      }
    });
  }

  obtenerSucursales() {
    this.httpSucursales.obtenerSucursales().subscribe((suc: any) => {
      this.Suc = suc;
      
      this.selectedSuc = this.Suc.map(() => true);
    });
  }

  obtenerMeses() {
    this.httpVentas.obtenerMeses().subscribe((mes: any) => {
      this.Mes = mes;
    });
  }

  
  iniciarEdicion(mes: number, suc: number) {
    this.editando = { mes, suc };
    this.valorTemporal = this.ventaMes[mes][`Suc${suc + 1}`];
  }

  toggleSucursal(index: number, checked: boolean) {
    this.selectedSuc[index] = checked;
    this.crearGrafico('boton1');
  }

  
  isSelected(index: number): boolean {
    return this.selectedSuc && this.selectedSuc[index];
  }

  
  guardarCambio() {
    if (this.editando) {
      const { mes, suc } = this.editando;
      const columna = `Suc${suc + 1}`;
      const fila = this.ventaMes[mes].id;
      const nuevoValor = this.valorTemporal;

      this.httpVentas.editarVenta(columna, fila, nuevoValor).subscribe(
        (response: any) => {
          if (response.success) {
            this.ventaMes[mes][`Suc${suc + 1}`] = nuevoValor;
            this.editando = null;
            this.crearGrafico('boton1');
          } else {
            alert('Error al actualizar la venta');
          }
        },
        (error) => {
          alert('Error en la comunicación con el servidor');
          console.error(error);
        }
      );
    }
  }

 
  cancelarEdicion() {
    this.editando = null;
    this.valorTemporal = 0;
  }

  
  estaEditando(mes: number, suc: number): boolean {
    return this.editando !== null && this.editando.mes === mes && this.editando.suc === suc;
  }

  generarTabla() {
    return this.ventaMes;
  }
}

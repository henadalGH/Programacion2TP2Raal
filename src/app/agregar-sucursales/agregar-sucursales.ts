import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SucursalesServicio } from '../sucursales/sucursales-servicio';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-sucursales',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-sucursales.html',
  styleUrl: './agregar-sucursales.css'
})
export class AgregarSucursales {

  formulario: FormGroup;
  router = inject(Router);

  constructor(private formb: FormBuilder, private sucursalSrv: SucursalesServicio) {
    // ✅ Definimos el FormGroup con los mismos nombres que espera el backend
    this.formulario = this.formb.group({
      nombre: [''],
      direccion: [''],
      empleado: ['']
    });
  }

  agregarSucursal() {
    const { nombre, direccion, empleado } = this.formulario.value;
    console.log({ nombre, direccion, empleado });
    // ✅ Llamamos al servicio
    this.sucursalSrv.agregarSucursal(nombre, direccion, empleado).subscribe({
      next: (res) => {
        console.log('✅ Sucursal agregada:', res);
        alert('Sucursal agregada correctamente');
        this.router.navigate(['/sucursales'])
      },
      error: (err) => {
        console.error('Error al agregar sucursal:', err);
        if (err.status === 400) {
          alert('Error: faltan datos en el formulario');
        } else {
          alert('Error al agregar la sucursal');
        }
      }
    });
  }
}


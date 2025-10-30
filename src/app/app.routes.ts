import { Routes } from '@angular/router';
import { Sucursales } from './sucursales/sucursales';
import { Reloj } from './reloj/reloj';
import { Home } from './home/home';
import { Clientes } from './clientes/clientes';
import { Ventas } from './ventas/ventas';
import { LoginComponent } from './Login/login';


export const routes: Routes = [
  {path: 'sucursales', component: Sucursales},
{ path: 'clientes', component: Clientes },
{ path: 'inicio', component: Home },
{path: 'Ventas', component: Ventas},
{ path:'', redirectTo: '/inicio', pathMatch: 'full'},
{path: 'login', component: LoginComponent}
];

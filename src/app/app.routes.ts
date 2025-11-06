import { Routes } from '@angular/router';
import { Sucursales } from './sucursales/sucursales';
import { Reloj } from './reloj/reloj';
import { Home } from './home/home';
import { Clientes } from './clientes/clientes';
import { Ventas } from './ventas/ventas';
import { Login } from './login/login';
import { AithGuardService } from './auth/auth.guard.service';





export const routes: Routes = [
  {path: 'sucursales', component: Sucursales , canActivate: [AithGuardService]},
{ path: 'clientes', component: Clientes , canActivate: [AithGuardService] },
{ path: 'inicio', component: Home /* , canActivate: [AithGuardService] */ },
{path: 'Ventas', component: Ventas, canActivate: [AithGuardService]},
{ path:'', redirectTo: '/login', pathMatch: 'full'},
{path: 'login', component: Login}
];

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Reloj } from "./reloj/reloj";
import { Footer } from "./footer/footer";
import { Sucursales} from "./sucursales/sucursales";
import { Home } from "./home/home";
import { Header } from "./header/header";




@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Reloj, Footer, Sucursales, Home, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   public navVisible: boolean= true;
  protected title = 'proy25';
  barra ():void {this.navVisible = !this.navVisible;}
}

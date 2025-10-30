import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})


export class Header {
title = "Bienvenidos";
ButName="Ocultar";
  public navVisible: boolean= true;
  
  barra ():void {
    if (this.navVisible = !this.navVisible) {
      this.ButName="Ocultar";
    } else{
      this.ButName="Mostrar"
    }
    
  }
}

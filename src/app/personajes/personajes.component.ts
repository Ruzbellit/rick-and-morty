import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Personaje } from '../personaje';
import { PersonajeDetailComponent } from '../personaje-detail/personaje-detail.component';
import { PersonajeService } from '../personaje.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UpperCasePipe, 
    PersonajeDetailComponent, 
    RouterLink,
    InfiniteScrollModule,
    FormsModule
  ],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit{

  personajes!: Personaje[];
  siguienteUrl: string = '';
  // nombre del personaje que va a buscar
  nombreBusqueda: string = '';
  generoSeleccionado: string = '';

  constructor(private personajeService: PersonajeService) { }

  ngOnInit() {
    this.getPersonajes();
  }

  getPersonajes(): void {
    this.personajeService.getPersonajes() 
      .subscribe((respuesta) => this.personajes = respuesta);
  }

  onScroll() {
    this.personajeService.getSiguientePagina().subscribe(
      personajes => this.personajes = [...this.personajes, ...personajes])
  }

  buscar() {
    if (this.nombreBusqueda !== '') {
      this.personajeService.getPersonajePorNombre(this.nombreBusqueda)
        .subscribe((response) => this.personajes = response.results); 
    } else {
      this.getPersonajes();
    }
  }

  filtrarPorGenero(genero: string) {
    this.nombreBusqueda = "";
    if (genero === this.generoSeleccionado) {
      this.generoSeleccionado = "";
      this.buscar();
    } else {
      this.generoSeleccionado = genero;
      this.personajeService.getPersonajesPorGenero(genero)
        .subscribe((response) => this.personajes = response.results);
    }
  }

  clear() {
    this.nombreBusqueda = "";
    this.generoSeleccionado = "";
    this.getPersonajes();
  }

}

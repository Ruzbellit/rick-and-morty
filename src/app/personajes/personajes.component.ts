import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Personaje } from '../personaje';
import { PersonajeDetailComponent } from '../personaje-detail/personaje-detail.component';
import { PersonajeService } from '../personaje.service';

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

  constructor(private personajeService: PersonajeService) { }

  ngOnInit() {
    this.getPersonajes();
  }

  getPersonajes(): void {
    this.personajeService.getPersonajes() 
      .subscribe(respuesta => this.personajes = respuesta);
  }

  onScroll() {
    this.personajeService.getSiguientePagina().subscribe(
      personajes => this.personajes = [...this.personajes, ...personajes])
    }

}

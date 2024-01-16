import { Component, OnInit } from '@angular/core';
import { Personaje } from '../personaje';
import { Origin } from '../origin';
import { PersonajeService } from '../personaje.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PersonajeDetailComponent} from '../personaje-detail/personaje-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe, PersonajeDetailComponent, RouterLink],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit{

  personajes!: Personaje[];

  constructor(private personajeService: PersonajeService) { }

  ngOnInit() {
    this.getPersonajes();
  }

  getPersonajes(): void {
    this.personajeService.getPersonajes() 
      .subscribe(personajes => this.personajes = personajes);
  }

}

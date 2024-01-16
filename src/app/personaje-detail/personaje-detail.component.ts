import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personaje } from '../personaje';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonajeService } from '../personaje.service';

@Component({
  selector: 'app-personaje-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe],
  templateUrl: './personaje-detail.component.html',
  styleUrl: './personaje-detail.component.css'
})
export class PersonajeDetailComponent implements OnInit {
  
  personaje!: Personaje;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private personajeService: PersonajeService
  ) { }

  ngOnInit() {
    this.getPersonaje();
  }

  getPersonaje(): void {
    const id = this.route.snapshot.paramMap.get('id');
      this.personajeService.getPersonaje(+id!)
      .subscribe(personaje => this.personaje = personaje!);
  }

  goBack(): void {
    this.location.back();
  }

}

import { Injectable } from '@angular/core';
import { Personaje, PersonajeResponse } from './personaje';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PersonajeService {

  private baseURL = "https://rickandmortyapi.com/api";
  private siguienteUrl: string = "";

  constructor(
    private http: HttpClient,
  ) { }

  getPersonajes(): Observable<Personaje[]> {
    const url = this.baseURL + '/character';
    return this.http.get<PersonajeResponse>(url).pipe(
      map( response => {
        this.siguienteUrl = response.info.next;
        return response.results
      })
    );
  }

  getPersonaje(id: number): Observable<Personaje | undefined> {
    const url = `${this.baseURL}/character/${id}`;
    return this.http.get<Personaje>(url);
  }

  getSiguientePagina(): Observable<Personaje[]> {
    if (!this.siguienteUrl) {
      return of([]);
    } else {
      return this.http.get<PersonajeResponse>(this.siguienteUrl).pipe(
        map((response) => {
          this.siguienteUrl = response.info.next;
          return response.results;
        })
      )
    }
  }

  // el siguiente método va a retornar un personaje dado un nombre
  getPersonajePorNombre(nombre: string): Observable<PersonajeResponse> {
    const url = this.baseURL + '/character/?name=' + nombre;
    return this.http.get<PersonajeResponse>(url);
  }

  getPersonajesPorGenero(genero: string): Observable<PersonajeResponse> {
    const url = this.baseURL + "/character/?gender=" + genero;
    return this.http.get<PersonajeResponse>(url); 
  }

}

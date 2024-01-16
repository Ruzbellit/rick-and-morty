import { Injectable } from '@angular/core';
import { Personaje } from './personaje';
import { Observable, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  private baseURL = "https://rickandmortyapi.com/api";
  private personajesUrl = 'api/personajes';  // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  getPersonajes(): Observable<Personaje[]> {
    // return of (PERSONAJES);
    const url = this.baseURL + '/character';

    // refactor the following line so it gets the property response before returning
    return this.http.get(url).pipe(
      map( (response: any )=> {
        return response.results;
      })
    );
  
  }

  getPersonaje(id: number): Observable<Personaje | undefined> {
    // return of(PERSONAJES.find(personaje => personaje.id === id));
    const url = `${this.baseURL}/character/${id}`;
    return this.http.get<Personaje>(url);
  }
 

}

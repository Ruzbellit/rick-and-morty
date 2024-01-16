import { Routes } from '@angular/router';
import { PersonajesComponent } from './personajes/personajes.component';
import { PersonajeDetailComponent } from './personaje-detail/personaje-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/personajes', pathMatch: 'full' },
    { path: 'personajes', component: PersonajesComponent },
    { path: 'detail/:id', component: PersonajeDetailComponent}
];

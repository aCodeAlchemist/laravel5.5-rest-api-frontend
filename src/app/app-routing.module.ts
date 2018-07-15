import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilmsComponent } from './films/films.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'films/create', component: FilmCreateComponent },
  { path: 'films/:filmSlug', component: FilmDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

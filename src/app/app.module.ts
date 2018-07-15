import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ApiService } from './api.service';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { MainService } from './main.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FilmsComponent,
    FilmDetailsComponent,
    FilmCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ApiService,
    MainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

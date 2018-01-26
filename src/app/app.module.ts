import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APPROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ListComponent } from './components/guia/listado/listado.component';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ListComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    APPROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

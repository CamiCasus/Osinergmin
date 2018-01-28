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
import { GuiaService } from './services/guia.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Guia } from './models/guiaListado';

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
    APPROUTING,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    GuiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

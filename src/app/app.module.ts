import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DetalleComponent } from './components/guia/detalle/detalle.component';
import { APPROUTING } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    NavbarComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    APPROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import { MessageModalComponent } from './components/shared/message-modal/message-modal.component';
import { InformeEnsayoLiquidoComponent } from './components/guia/informe-ensayo-liquido/informe-ensayo-liquido.component';
import { InformeEnsayoGlpComponent } from './components/guia/informe-ensayo-glp/informe-ensayo-glp.component';
import { RegistroResultadoComponent } from './components/guia/registro-resultado/registro-resultado.component';
import { TipoMuestraPipe } from './pipes/tipo-muestra.pipe';
import { ContentPopupComponent } from './components/shared/content-popup/content-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarDetalleComponent } from './components/guia/registrar-detalle/registrar-detalle.component';
import { MaestrosService } from './services/maestros.service';
import { LoginComponent } from './components/shared/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ListComponent,
    RegistrarComponent,
    MessageModalComponent,
    InformeEnsayoLiquidoComponent,
    InformeEnsayoGlpComponent,
    RegistroResultadoComponent,
    TipoMuestraPipe,
    ContentPopupComponent,
    RegistrarDetalleComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    APPROUTING,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [
    GuiaService,
    MaestrosService,
    AuthenticationService,
    AlertService,
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MessageModalComponent, ContentPopupComponent]
})
export class AppModule { }

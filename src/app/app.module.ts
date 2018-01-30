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
import { ResultadoMuestraPopupComponent } from './components/shared/resultado-muestra-popup/resultado-muestra-popup.component';
import { FormsModule } from '@angular/forms';

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
    ResultadoMuestraPopupComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    APPROUTING,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    GuiaService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MessageModalComponent, ResultadoMuestraPopupComponent]
})
export class AppModule { }

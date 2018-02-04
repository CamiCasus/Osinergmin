import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/guia/listado/listado.component';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';
import { InformeEnsayoLiquidoComponent } from './components/guia/informe-ensayo-liquido/informe-ensayo-liquido.component';
import { InformeEnsayoGlpComponent } from './components/guia/informe-ensayo-glp/informe-ensayo-glp.component';
import { RegistroResultadoComponent } from './components/guia/registro-resultado/registro-resultado.component';
import { HomeComponent } from './components/shared/home/home.component';
import { LoginComponent } from './components/shared/login/login.component';


const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'listado', component: ListComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'registrar/:id', component: RegistrarComponent },
    { path: 'resultado/:id', component: RegistroResultadoComponent },
    { path: 'ensayoLiquido/:id', component: InformeEnsayoLiquidoComponent },
    { path: 'ensayoGlp/:id', component: InformeEnsayoGlpComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);

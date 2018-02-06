import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/guia/listado/listado.component';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';
import { InformeEnsayoLiquidoComponent } from './components/guia/informe-ensayo-liquido/informe-ensayo-liquido.component';
import { InformeEnsayoGlpComponent } from './components/guia/informe-ensayo-glp/informe-ensayo-glp.component';
import { RegistroResultadoComponent } from './components/guia/registro-resultado/registro-resultado.component';
import { LoginComponent } from './components/shared/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';


const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'listado', component: ListComponent, canActivate: [ AuthGuardService] },
    { path: 'registrar', component: RegistrarComponent, canActivate: [ AuthGuardService] },
    { path: 'registrar/:id', component: RegistrarComponent, canActivate: [ AuthGuardService] },
    { path: 'resultado/:id', component: RegistroResultadoComponent, canActivate: [ AuthGuardService] },
    { path: 'ensayoLiquido/:id', component: InformeEnsayoLiquidoComponent, canActivate: [ AuthGuardService] },
    { path: 'ensayoGlp/:id', component: InformeEnsayoGlpComponent, canActivate: [ AuthGuardService] },
    { path: '**', redirectTo: 'listado' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);

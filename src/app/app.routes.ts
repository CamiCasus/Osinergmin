import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/guia/listado/listado.component';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';


const ROUTES: Routes = [
    { path: 'listado', component: ListComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'listado' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);

import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './components/guia/registrar/registrar.component';
import { DetalleComponent } from './components/guia/detalle/detalle.component';

const ROUTES: Routes = [
    { path: 'registrar', component: RegistrarComponent },
    { path: 'detalle', component: DetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'registrar' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);

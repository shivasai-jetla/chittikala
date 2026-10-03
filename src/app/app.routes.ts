import { Routes } from '@angular/router';
export const routes: Routes = [
 { path: 'admin', loadComponent: () => import('./admin').then(m => m.AdminComponent) },
 { path: '', loadComponent: () => import('./app').then(m => m.AppComponent) },
 { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CarGridComponent } from './features/car-grid/car-grid/car-grid.component';
import { AuthGuard } from './core/services/auth.guard'; 

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
     
  },
  {
    path: 'car-grid',
    component: CarGridComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];

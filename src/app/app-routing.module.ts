import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown paths to login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

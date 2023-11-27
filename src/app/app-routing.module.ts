import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'type-select',
    loadChildren: () => import('./type-select/type-select.module').then( m => m.TypeSelectPageModule)
  },
  {
    path: 'chome',
    loadChildren: () => import('./conductor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'phome',
    loadChildren: () => import('./pasajero/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./conductor/vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'agregar-vehiculo',
    loadChildren: () => import('./conductor/agregar-vehiculo/agregar-vehiculo.module').then( m => m.AgregarVehiculoPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./conductor/crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

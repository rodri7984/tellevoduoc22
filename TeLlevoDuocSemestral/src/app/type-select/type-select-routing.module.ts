import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeSelectPage } from './type-select.page';

const routes: Routes = [
  {
    path: '',
    component: TypeSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeSelectPageRoutingModule {}

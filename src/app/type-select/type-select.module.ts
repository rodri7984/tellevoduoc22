import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeSelectPageRoutingModule } from './type-select-routing.module';

import { TypeSelectPage } from './type-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeSelectPageRoutingModule
  ],
  declarations: [TypeSelectPage]
})
export class TypeSelectPageModule {}

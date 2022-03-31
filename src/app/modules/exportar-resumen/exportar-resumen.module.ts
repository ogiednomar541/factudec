import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportarResumenRoutingModule } from './exportar-resumen-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExportarResumenRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExportarResumenModule { }

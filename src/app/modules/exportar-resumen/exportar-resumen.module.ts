import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportarResumenRoutingModule } from './exportar-resumen-routing.module';
import { SummaryComponent } from './pages/summary/summary.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ExportarResumenRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExportarResumenModule { }

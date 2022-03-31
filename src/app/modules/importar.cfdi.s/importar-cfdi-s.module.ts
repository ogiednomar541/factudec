import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImportarCFDISRoutingModule } from './importar-cfdi-s-routing.module';
import { XmlCfdiSelectorComponent } from './pages/xml-cfdi-selector/xml-cfdi-selector.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    XmlCfdiSelectorComponent
  ],
  imports: [
    CommonModule,
    ImportarCFDISRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImportarCFDISModule { }

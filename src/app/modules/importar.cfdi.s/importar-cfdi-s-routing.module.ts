import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XmlCfdiSelectorComponent } from './pages/xml-cfdi-selector/xml-cfdi-selector.component';

const routes: Routes = [
  {
    path:'',
    component: XmlCfdiSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportarCFDISRoutingModule { }

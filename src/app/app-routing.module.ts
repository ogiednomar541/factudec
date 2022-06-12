import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import ('./modules/importar.cfdi.s/importar-cfdi-s.module').then(m => m.ImportarCFDISModule )
  },
  {
    path:'resumen',
    loadChildren:()=> import ('./modules/exportar-resumen/exportar-resumen.module').then(m => m.ExportarResumenModule )
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

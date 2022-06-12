import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Egreso, Ingreso, Traslado } from '@src/app/classes/cfdi';
import { XmlCfdiSelectorComponent } from '@src/app/modules/importar.cfdi.s/pages/xml-cfdi-selector/xml-cfdi-selector.component';
import { ProcessFilesService } from '@src/app/services/process-files.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public data: Array<any> = [];
  public CFDIArray: any[] = [];
  public CFDIFiltered: any[] = this.CFDIArray;

  public mesesList: Array<any> = [];
  public tipoCfdiList: Array<any> = [];
  public RSList: Array<any> = [];
  public rfcList: Array<any> = [];
  public vList: Array<any> = [];

  public t_exentos: number = 0;
  public t_gravados: number = 0;
  public t_iva: number = 0;
  public t_retenido: number = 0;
  public t_neto: number = 0;
  


  constructor( private processFileServ:ProcessFilesService, private router: Router) 
  { 
    this.data = this.processFileServ.getParam("data");
    console.log(this.data);
    if (this.data != undefined){
      this.process(this.data);
    }else{
      this.router.navigate(['/']);

    }
    
  }

  ngOnInit(): void {
    
  }

  process(data:Array<any>){
    let i, n: number = 0;
    try{
      for( i = 0; i < Object.keys(data).length; i ++){
        n = i;
        if(data[i]._TipoDeComprobante === 'I'){
          this.CFDIArray.push(new Ingreso(data[i]));
          if(!this.tipoCfdiList.includes("Ingreso")){
            this.tipoCfdiList.push("Ingreso");
          }
        } else if(data[i]._TipoDeComprobante === 'E'){
          this.CFDIArray.push(new Egreso(data[i]));
          if(!this.tipoCfdiList.includes("Egreso")){
            this.tipoCfdiList.push("Egreso");
          }
        } else if(data[i]._TipoDeComprobante === 'T'){
          this.CFDIArray.push(new Traslado(data[i]));
          if(!this.tipoCfdiList.includes("Traslado")){
            this.tipoCfdiList.push("Traslado");
          }
        }

        if(!this.rfcList.includes((data[i].Emisor._Rfc).toString())){
          this.rfcList.push((data[i].Emisor._Rfc).toString());
        }

        if(!this.RSList.includes((data[i].Emisor._Nombre).toString())){
          this.RSList.push((data[i].Emisor._Nombre).toString());
        }

        if(!this.vList.includes((data[i]._Version).toString())){
          this.vList.push((data[i]._Version).toString());
        }

      }

      this.getTotal();
      
    } catch(e){
      console.error(e);
    }
  }

  getConcepts(Conceptos: any[]): string{
    let res = '';

    for(let i = 0; i < Conceptos.length - 1; i++){
      res += Conceptos[i]._Descripcion + ", ";
    }

    return res + Conceptos[Conceptos.length  -1]._Descripcion;
  }

  getStringDateM(date: Date) : string{
    let d = new Date(date);
    let dateFormattedM: string = d.getUTCDate().toString().padStart(2, '0') + '/';
    dateFormattedM += this.getStringM(d);
    return dateFormattedM + '/' + d.getFullYear();
}

getStringM(date: Date): string{
  let d = new Date (date);
  let month: string = "";

  switch(d.getMonth()){
    case 0: month += 'Enero'; break;
    case 1: month += 'Febrero'; break;
    case 2: month += 'Marzo'; break;
    case 3: month += 'Abril'; break;
    case 4: month += 'Mayo'; break;
    case 5: month += 'Junio'; break;
    case 6: month += 'Julio'; break;
    case 7: month += 'Agosto'; break;
    case 8: month += 'Septiembre'; break;
    case 9: month += 'Octubre'; break;
    case 10: month += 'Noviembre'; break;
    case 11: month += 'Diciembre'; break;
  }

  if (!this.mesesList.includes(month)){
    this.mesesList.push(month);
  }

  return month
}

getImpEx(data: Ingreso | Egreso): number{
  let impEx:number,total:number,impGrav:number,iva:number; //impuestos retenidos*****
  total = parseFloat(data._Total.toString());
  iva = this.getIva(data);
  impEx = total - (this.getImpGrav(data) + iva); //impGrav+iva-impRet
  return this.round(impEx>=0?impEx:0);
}



getImpGrav(data:Ingreso | Egreso): number{
  let iva = this.getIva(data);
  let impGrav = iva / 0.16;
  return this.round(impGrav);
}

getIva(data: Ingreso | Egreso): number{
  //console.log("Holaaaa " + data.Impuestos.hasOwnProperty('_TotalImpuestosTrasladados'))
  let iva: number;
  if (data.Impuestos != undefined){
    iva = parseFloat((data.Impuestos[0]._TotalImpuestosTrasladados?data.Impuestos[0]._TotalImpuestosTrasladados:0).toString());
  }else{
    iva = 0;
  }
  
  return iva;
}

currency(number:number){
  return new Intl.NumberFormat('es-MX', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2}).format(number);
};

round(num:number) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

mf(evt: any){
  var checkList = document.getElementById('list1');
  if (checkList!.classList.contains('visible')){
    checkList!.classList.remove('visible');
  }else{
    checkList!.classList.add('visible');
  }

 }

tf(evt: any){
  var checkList = document.getElementById('list2');
  if (checkList!.classList.contains('visible'))
    checkList!.classList.remove('visible');
  else
    checkList!.classList.add('visible');
}

rsf(evt: any){
  var checkList = document.getElementById('list3');
  if (checkList!.classList.contains('visible'))
    checkList!.classList.remove('visible');
  else
    checkList!.classList.add('visible');
}

rfcf(evt: any){
  var checkList = document.getElementById('list4');
  if (checkList!.classList.contains('visible'))
    checkList!.classList.remove('visible');
  else
    checkList!.classList.add('visible');
}

vf(evt: any){
  var checkList = document.getElementById('list5');
  if (checkList!.classList.contains('visible'))
    checkList!.classList.remove('visible');
  else
    checkList!.classList.add('visible');
}

monthFilter(month:string){
  var checkBox = document.getElementById(month) as HTMLInputElement;

  if (!checkBox.checked){
    const tmp = this.CFDIFiltered.filter(item => this.getStringM(item._Fecha) != month);
    this.CFDIFiltered = tmp;
  }else{
    for (let item of this.CFDIArray){
      if (this.getStringM(item._Fecha) == month){
        this.CFDIFiltered.push(item);
      }
    }
  }
  this.getTotal();
}

typeFilter(type:string){
  var checkBox = document.getElementById(type) as HTMLInputElement;

  if (!checkBox.checked){
    const tmp = this.CFDIFiltered.filter(item => item._TipoDeComprobante != type.slice(0,1));
    this.CFDIFiltered = tmp;
  }else{
    for (let item of this.CFDIArray){
      if (item._TipoDeComprobante == type.slice(0,1)){
        this.CFDIFiltered.push(item);
      }
    }
  }
  this.getTotal();
}

rsFilter(rs:string){
  var checkBox = document.getElementById(rs) as HTMLInputElement;

  if (!checkBox.checked){
    const tmp = this.CFDIFiltered.filter(item => item.Emisor._Nombre != rs);
    this.CFDIFiltered = tmp;
  }else{
    for (let item of this.CFDIArray){
      if (item.Emisor._Nombre == rs){
        this.CFDIFiltered.push(item);
      }
    }
  }
  this.getTotal();
}

rfcFilter(rfc:string){
  var checkBox = document.getElementById(rfc) as HTMLInputElement;

  if (!checkBox.checked){
    const tmp = this.CFDIFiltered.filter(item => item.Emisor._Rfc != rfc);
    this.CFDIFiltered = tmp;
  }else{
    for (let item of this.CFDIArray){
      if (item.Emisor._Rfc == rfc){
        this.CFDIFiltered.push(item);
      }
    }
  }
  this.getTotal();
}

vFilter(version:string){
  var checkBox = document.getElementById(version) as HTMLInputElement;

  if (!checkBox.checked){
    const tmp = this.CFDIFiltered.filter(item => item._Version != version);
    this.CFDIFiltered = tmp;
  }else{
    for (let item of this.CFDIArray){
      if (item._Version == version){
        this.CFDIFiltered.push(item);
      }
    }
  }
  this.getTotal();
}

getTotal(){
  this.t_exentos = 0;
  this.t_gravados = 0;
  this.t_iva = 0;
  this.t_neto = 0;
  for (let item of this.CFDIFiltered){
    this.t_exentos += this.getImpEx(item);
    this.t_gravados += this.getImpGrav(item);
    this.t_iva += this.getIva(item);
    this.t_neto += parseFloat(item._Total);
  }
}  

}


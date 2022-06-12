import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessFilesService } from '@src/app/services/process-files.service';
import { XMLParser, X2jOptions } from 'fast-xml-parser';

import * as converter from 'xml-js';


@Component({
  selector: 'app-xml-cfdi-selector',
  templateUrl: './xml-cfdi-selector.component.html',
  styleUrls: ['./xml-cfdi-selector.component.css']
})
export class XmlCfdiSelectorComponent implements OnInit {
  private parser: XMLParser;
  private parserOptions: Partial<X2jOptions> = {
    ignoreAttributes: false,
    attributeNamePrefix : '_',
  };

  constructor(private processFileServ: ProcessFilesService, private router: Router) {
    this.parser = new XMLParser(this.parserOptions);
   }

  ngOnInit(): void {
  }

  dropZone: any; 
  files: Array<any> = [];
  comprobanteJSON: Array<any> = [];

  showDropArea(){
    this.dropZone = document.getElementById("dropArea") as HTMLDivElement;
    this.dropZone.style.display = "flex";
  }

  hideDropArea(){
    this.dropZone = document.getElementById("dropArea") as HTMLDivElement;
    this.dropZone.style.display = "none";
  }

  goDrop(event: any){
    event.preventDefault();
  }

  openFilePicker(event: any){
    let filePicker: HTMLElement = document.getElementsByClassName("FilePicker")[0] as HTMLElement;
    filePicker.click();
  }

  goNewWorkArea (){
    let uploader = document.getElementById("uploader") as HTMLElement;
    uploader.style.display = "none";
  }

  getFilesFromFilePicker(event: any){
    const _AllFiles = event.target.files;
    
    if (_AllFiles){
      for (var i = 0; i< _AllFiles.length;i++){
        const file = _AllFiles[i];
        if (file.type == "text/xml"){
          this.files.push(file);
        }else{
          this.showUploadError(file.name);
        }
      }
    }
  }

  getFileList(event: any){
    this.hideDropArea();
    const _AllFiles = event.dataTransfer.items;
    event.preventDefault();

    if (_AllFiles) {
      for (var i = 0; i < _AllFiles.length; i++) {
        const file = _AllFiles[i].getAsFile();
        if (file.type == "text/xml") {
            this.files.push(file);
        }else{
          this.showUploadError(file.name);
        }
      }

    }
      if (this.files.length==0){
        this.goNewWorkArea();
      }
      
  }

  showUploadError(err: string){
    alert("Error: archivo no soportado: " + err);
  }

  async processFiles(){
    this.comprobanteJSON = await this.readFiles(this.files);
    //this.comprobanteJSON.push(await this.readFiles(this.files));
    //console.log(this.comprobanteJSON[0].Emisor._attributes.Nombre);
    //alert(this.comprobanteJSON[1].Emisor._attributes.Nombre);
    this.processFileServ.setParam("data",this.comprobanteJSON);
    this.router.navigate(['/resumen']);
  }
  
  /*getData(){
    //Get local upload file path
    const getUploadUrl = function(file: any) {
      let url = "";
      if ((window as any).createObjectURL != undefined) {
          // basic
          url = (window as any).createObjectURL(file);
      } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
      }
      return url; //  Return such a string of address blobs: http://www.xxxx.com/2c230fa5-ecc4-4314-ae7c-c39eaa66a945
    };
      
    const loadXML = function(xmlFile: string | URL) {
      var xmlDom = null;
      var xmlhttp = new window.XMLHttpRequest();
      xmlhttp.open("GET", xmlFile, false);
      xmlhttp.send(null);
      xmlDom = xmlhttp.responseXML;
      return xmlDom; //  The returned object is a doucument object
    };


    let url = getUploadUrl(this.files[0]); //  File object
    var xmlhttp: XMLHttpRequest = new XMLHttpRequest;
   
    if (window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }else{
      alert("NAVEGADOR NO SOPORTADO POR EL MOMENTO");
    }
    let xml = loadXML(url);
    if (xml != null){
      var testObj = xml,
      x = testObj.getElementsByTagName("cfdi:Conceptos"),
      objectElem = x[0];
      var a = objectElem.getElementsByTagName("cfdi:Concepto"),
      b = a[0].getAttribute("Descripcion");
      alert(b);
    }else{
      alert("0000000000000000");
    }
  
  }*/

  public async readFile(file: File): Promise<any>{
    //const xml = converter.xml2json(await this.getFileData(file), { compact: true, spaces: 2 })
    let fileJSON:any = this.parser.parse(await this.getFileData(file));
    return fileJSON.Comprobante ? fileJSON.Comprobante : null;
  }

  public async readFiles(files: Array<any>): Promise<any[]>{
    let filesJSON: Array<any> = [];
    
    for(let i = 0; i < files.length; i++){
      filesJSON.push(await this.readFile(files[i]));
    }
    return filesJSON;
  }
  
  private async getFileData(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if(reader.result){
          resolve(this.normalizeText(reader.result.toString()));
        } else {
          reject('');
        }
      };

      reader.onerror = () => { reject('') };
      reader.readAsText(file);
    });
  }

  /*getData(){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let xml = e.target.result;
      xml = this.normalizeText(xml);
      let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
      //console.log(xml)
      //console.log(result1)
      let JSONData:any = JSON.parse(result1);
      console.log(JSONData);
      //alert(JSONData['cfdi:Comprobante']['cfdi:Emisor']['_attributes']['Nombre']);
      alert(JSONData.Comprobante.Emisor._attributes.Nombre);

    }

    reader.readAsText(this.files[0]);
  }*/

  private normalizeText(cfdiStr: string){
    return cfdiStr.replace(new RegExp('cfdi:', 'g'), '').replace(new RegExp('tfd:', 'g'), '');
  }




}

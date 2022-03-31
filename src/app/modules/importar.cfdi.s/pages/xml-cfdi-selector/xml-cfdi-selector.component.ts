import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xml-cfdi-selector',
  templateUrl: './xml-cfdi-selector.component.html',
  styleUrls: ['./xml-cfdi-selector.component.css']
})
export class XmlCfdiSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dropZone: any; 
  files: Array<any> = [];

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
    let tool_header = document.getElementsByClassName("tool-header")[0] as HTMLElement;
    uploader.style.display = "none";
    tool_header.style.display = "none";
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
        console.log(this.files);
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

      console.log(this.files);

      }
      
      this.goNewWorkArea();
  }

  showUploadError(err: string){
    alert("Error: archivo no soportado: " + err);
  }
}

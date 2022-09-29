import { Component, OnInit, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styles: [
  ]
})
export class UploadFilesComponent implements OnInit {

  @Input()accept:string='*';
  @Input()files: File[] = [];
  @Input()placeholder:string ='';
  @Output() multipleImages = new EventEmitter<any>();
  @Output() message:any = new EventEmitter<any>();
  @Input() label:string = 'Suelta ó selecciona los archivos';
  // files: File[]=[];
  constructor(
    private elementRef:ElementRef
  ) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    if(this.files.length < 5){
    this.files.push(...event.addedFiles);
    this.multipleImages.emit(this.files)
    this.message.emit(event)
    // console.log(this.files)
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.multipleImages.emit(this.files)
    // console.log(this.files)
  }

}

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { Fancybox } from '@fancyapps/ui';
import { AlertsService } from '../../services/alerts.service';
// import { NgxRolesService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styles: [
  ]
})
export class DropzoneComponent implements OnInit {

  @ViewChild('dropzone') dropzone:NgxDropzoneComponent;

  @Input() showOrder:boolean =true;
  @Input() files: File[] = [];
  @Input() accept:string='image/jpeg,image/png,image/gif';
  @Input() multiple:boolean = true;
  @Input() maxFile:number = 10;
  @Input() label:string = 'Suelta ó selecciona los archivos';
  @Input() dimensionState:boolean;
  @Input() btn:boolean =true;
  @Input() dimensionesImg:any;
  @Output() filesOutput:EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() photoPrincipalIndex:EventEmitter<number> = new EventEmitter<number>();

  imgTemp:string | ArrayBuffer;
  videoTemp:any;
  pdfTemp:any;

  videoPreview:HTMLElement;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private alertsService: AlertsService,
    // private ngxRolesService: NgxRolesService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.videoPreview = document.getElementById("videoPreview");
  }

  onSelect(event) {
    console.log(this.dimensionesImg)
    const totalFiles = this.files.length + event.addedFiles.length;
    if(totalFiles<=this.maxFile){
      if(this.dimensionState){
        const eventI = event.addedFiles[0];
        var i = new Image();
        let image;
        var reader = new FileReader();
        reader.readAsDataURL(eventI);
        reader.onload = function(eventI) {
          image = reader.result;
          i.src = image;
          };
        i.onload = ()=> {
          // alert(i.width + 'x' + i.height);

          if((i.width>this.dimensionesImg.maxWidth || i.width<this.dimensionesImg.minWidth) || (i.height>this.dimensionesImg.maxHeigth || i.height<this.dimensionesImg.minHeigth) ){
            this.toastrService.error('El archivo no cumple con las recomendaciones', '', {
              timeOut: 2000,
              progressBar: true,
            });
            return;
            }else{
               this.files.push(...event.addedFiles);
               this.filesOutput.emit(this.files);
            }
          }
      }

    }else{
      // this.alertsService.toastMixin(`Solo puede seleccionar un máximo de ${this.maxFile} archivo`,'error');
      this.toastrService.error(`Solo puede seleccionar un máximo de ${this.maxFile} archivo`, '', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.filesOutput.emit(this.files);
  }

  viewPhoto(file:File){
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (fileURL) => {
      const fancybox = Fancybox.show([
        {
          src:fileURL.target.result,
          type:'image'
        }
      ])
    };

  }

  async checkPhotoAsPrincipal(indexFile:number){
    const {result} = await this.alertsService.confirmDialogWithModals('Info.','¿Hacer esta imagen la principal?','question');
    if(result.isConfirmed){
      this.photoPrincipalIndex.emit(indexFile);
    }
  }

  clear(){
   this.files=[];
  }

}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal,{SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastrService: ToastrService) { }

  async toastMixin(title:string,icon:'success' | 'error' | 'warning' | 'info',timer:number=3000):Promise<any>{

    if(icon == 'success'){
      this.toastrService.success(title, '', {
        timeOut: timer,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

    if(icon == 'error'){
      this.toastrService.error(title, '', {
        timeOut: timer,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

    if(icon == 'warning'){
      this.toastrService.warning(title, '', {
        timeOut: timer,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

    if(icon == 'info'){
      this.toastrService.warning(title, '', {
        timeOut: timer,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  async confirmDialogWithModals(title:string,text:string,icon:SweetAlertIcon){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass:{
        confirmButton:'btn btn-success',
        cancelButton:'btn btn-danger'
      },
      buttonsStyling:false
    });

    const result = await swalWithBootstrapButtons.fire({
      title,
      text,
      icon,
      showCancelButton:true,
      confirmButtonText:'Sí, continuar',
      cancelButtonText:'No, cancelar',
      reverseButtons:true
    });
    return {result,swalWithBootstrapButtons};
  }

  async confirmDialogWithModalsWithCheckBox(title:string,text:string,textCheckBox:string,icon:SweetAlertIcon){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass:{
        confirmButton:'btn btn-success',
        cancelButton:'btn btn-danger'
      },
      buttonsStyling:false
    });

    const result = await swalWithBootstrapButtons.fire({
      title,
      text,
      icon,
      input: 'checkbox',
      inputValue: 0,
      inputPlaceholder:textCheckBox,
      showCancelButton:true,
      confirmButtonText:'Sí, continuar',
      cancelButtonText:'No, cancelar',
      reverseButtons:true
    });

    return {result,swalWithBootstrapButtons};

  }

}

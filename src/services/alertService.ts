import Swal, { type SweetAlertIcon, type SweetAlertResult } from 'sweetalert2';

export const alertService = {
  success(message: string, title = 'Success'): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#4680FF'
    });
  },

  error(message: string, title = 'Error'): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#dc2626'
    });
  },

  confirm(message: string, title = 'Are you sure?'): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2ca87f',
      cancelButtonColor: '#dc2626'
    });
  },

  toast(message: string, icon: SweetAlertIcon = 'success'): Promise<SweetAlertResult> {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }
};

export default alertService;
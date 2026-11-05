import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export const alertService = {
    success(message: string, title = 'Success'): Promise<SweetAlertResult> {
        return Swal.fire({
            icon: 'success',
            title,
            text: message
        });
    },

    error(message: string, title = 'Error'): Promise<SweetAlertResult> {
        return Swal.fire({
            icon: 'error',
            title,
            text: message
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
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444'
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
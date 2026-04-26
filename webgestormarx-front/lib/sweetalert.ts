import Swal, { SweetAlertOptions } from 'sweetalert2';

/**
 * Show a success notification
 */
export const showSuccess = (message: string, title: string = '¡Éxito!') => {
    return Swal.fire({
        icon: 'success',
        title,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
    });
};

/**
 * Show an error notification
 */
export const showError = (message: string, title: string = 'Error') => {
    return Swal.fire({
        icon: 'error',
        title,
        text: message,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ef4444',
    });
};

/**
 * Show a confirmation dialog for delete operations
 */
export const confirmDelete = async (itemName: string = 'este elemento'): Promise<boolean> => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar ${itemName}? Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
};

/**
 * Show a generic confirmation dialog
 */
export const confirmAction = async (
    title: string,
    message: string,
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
): Promise<boolean> => {
    const result = await Swal.fire({
        title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    });

    return result.isConfirmed;
};

/**
 * Show a loading state
 */
export const showLoading = (message: string = 'Procesando...') => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

/**
 * Close any open SweetAlert
 */
export const closeAlert = () => {
    Swal.close();
};

/**
 * Show an info notification
 */
export const showInfo = (message: string, title: string = 'Información') => {
    return Swal.fire({
        icon: 'info',
        title,
        text: message,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3b82f6',
    });
};

/**
 * Show a warning notification
 */
export const showWarning = (message: string, title: string = 'Advertencia') => {
    return Swal.fire({
        icon: 'warning',
        title,
        text: message,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#f59e0b',
    });
};

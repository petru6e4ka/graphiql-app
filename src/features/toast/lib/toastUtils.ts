import { toast, ToastOptions, Slide } from 'react-toastify';

export enum ToastType {
  info,
  success,
  error,
}

export const options: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'light',
  transition: Slide,
};

export function showToast(message: string, type: ToastType = ToastType.info) {
  switch (type) {
    case ToastType.success:
      toast.success(message, options);
      break;
    case ToastType.error:
      toast.error(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
}

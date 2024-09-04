import { toast, ToastOptions, Slide } from 'react-toastify';

type ToastType = 'info' | 'success' | 'error';

export default function showToast(message: string, type: ToastType = 'info') {
  const options: ToastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
    transition: Slide,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
}

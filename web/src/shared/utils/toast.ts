import { Bounce, toast, ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

export const toastInfo = (msg: string) => toast.info(msg, toastOptions);
export const toastSuccess = (msg: string) => toast.success(msg, toastOptions);
export const toastWarn = (msg: string) => toast.warn(msg, toastOptions);
export const toastError = (msg: string) => toast.error(msg, toastOptions);

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export function Toaster(props) {
  return (
    <SonnerToaster
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        style: { boxShadow: '0 10px 25px rgba(0,0,0,0.08)', borderRadius: 12 },
      }}
      {...props}
    />
  );
}

export const toast = sonnerToast;
export default Toaster;

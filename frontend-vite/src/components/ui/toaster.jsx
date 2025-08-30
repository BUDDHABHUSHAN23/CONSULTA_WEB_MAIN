import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export function Toaster(props) {
  return <SonnerToaster richColors position="top-center" closeButton {...props} />;
}

export const toast = sonnerToast;
export default Toaster;

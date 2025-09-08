// Unified toast API: re-export Sonner toast
// Keeps existing imports (`use-toast.js`) working while using the new toaster
import { toast as sonnerToast } from "../components/ui/toaster";

export const toast = sonnerToast;
export default toast;

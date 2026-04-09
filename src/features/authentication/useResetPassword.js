import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { mutate: sendResetEmail, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset email sent! Check your inbox.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendResetEmail, isLoading };
}

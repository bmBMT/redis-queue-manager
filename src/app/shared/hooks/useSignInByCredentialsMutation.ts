import { SignInDtoType } from "@server/resources/auth/auth.dto";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const useSignInByCredentialsMutation = () => {
  return useMutation({
    mutationFn: (dto: SignInDtoType) => signIn("credentials", { redirect: false, ...dto }),
		onSettled: (data) => {
			if (data?.error) {
				console.log(data);
			}
		}
  });
};

export default useSignInByCredentialsMutation;

import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";

export const load = verifyCredentials({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: () => {
    throw redirect(302, "/lord");
  },
});

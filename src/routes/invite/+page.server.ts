import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";

export const load = verifyCredentials({
  onSuccess: () => {
    throw redirect(302, "/home");
  },
});

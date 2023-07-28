import { GraphQLRequest } from "$lib/GraphQLRequest";
import { publicUserFragment } from "$lib/graphql/user";
import { writable } from "svelte/store";
import { LoginValidators } from "./LoginValidators";

export const error = writable("");

export class LoginController {
  email = "";
  password = "";

  public validateEmail() {
    if (!LoginValidators.validEmail(this.email)) {
      error.update(() => "A valid email is required");
      return false;
    }
    return true;
  }

  public validatePassword() {
    if (!LoginValidators.validPassword(this.password)) {
      error.update(() => "Passwords must be at least 5 characters");
      return false;
    }
    return true;
  }

  public onChange(e: any) {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "email") {
        this.email = value;
      } else if (name === "password") {
        this.password = value;
      }
    }
  }

  public async submit() {
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const request = new GraphQLRequest({
      query: `
				query Login($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						${publicUserFragment}
					}
				}
			`,
      variables: {
        email,
        password,
      },
    });
    const response = await request.send();
    return response.json();
  }
}

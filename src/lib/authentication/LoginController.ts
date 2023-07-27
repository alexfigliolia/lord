import { GraphQLRequest } from "$lib/GraphQLRequest";
import { publicUserFragment } from "$lib/graphql/user";
import { writable } from "svelte/store";

export const error = writable("");

export class LoginController {
  static email = "";
  static password = "";
  private static emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  public static validateEmail() {
    const valid = this.emailReg.test(this.email);
    if (!valid) {
      error.update(() => "A valid email is required");
    }
    return valid;
  }

  public static validatePassword() {
    if (this.password.length < 5) {
      error.update(() => "Passwords must be at least 5 characters");
      return false;
    }
    return true;
  }

  public static get validEmail() {
    if (!this.email.length) {
      return null;
    }
    return this.emailReg.test(this.email);
  }

  public static get validPassword() {
    if (!this.password.length) {
      return null;
    }
    return this.password.length >= 5;
  }

  public static onChange(e: any) {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "email") {
        this.email = value;
      } else if (name === "password") {
        this.password = value;
      }
    }
  }

  public static async submit() {
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

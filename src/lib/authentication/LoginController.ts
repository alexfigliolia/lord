import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { LoginValidators } from "./LoginValidators";
import { loginQuery } from "$lib/graphql/authentication.gql";
import { writable } from "svelte/store";
import { TaskQueue } from "@figliolia/task-queue";
import { goto } from "$app/navigation";
import type { Login, LoginVariables } from "$lib/schema/Login";

export const error = writable("");

export class LoginController<T extends Record<string, any> = Login> {
  email = "";
  password = "";
  Queue = new TaskQueue();
  constructor() {
    this.onChange = this.onChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

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

  public submit() {
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const request = new GraphQLRequest<Login, LoginVariables>({
      query: loginQuery,
      variables: {
        email,
        password,
      },
    });
    try {
      return request.send() as unknown as Promise<T>;
    } catch (error: any) {
      if (error.response?.errors?.length) {
        throw new Error(error.response.errors[0].message);
      }
      throw error;
    }
  }

  public redirect() {
    this.Queue.deferTask(() => {
      void goto("/home");
    }, 1000);
  }
}

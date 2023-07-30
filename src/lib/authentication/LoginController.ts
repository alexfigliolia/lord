import { GraphQLRequest } from "$lib/GraphQLRequest";
import { LoginValidators } from "./LoginValidators";
import { loginQuery } from "$lib/graphql/authentication.gql";
import { Factory } from "$lib/state/Factory";

export const error = Factory.createWritable("Login Error", "");

export class LoginController {
  email = "";
  password = "";
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

  public async submit() {
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const request = new GraphQLRequest({
      query: loginQuery,
      variables: {
        email,
        password,
      },
    });
    const response = await request.send();
    return response.json();
  }
}

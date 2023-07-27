import { GraphQLRequest } from "$lib/GraphQLRequest";
import { LoginController, error } from "$lib/authentication/LoginController";
import { publicUserFragment } from "$lib/graphql/user";

export class SignUpController extends LoginController {
  static nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  static username = "";

  public static validateName() {
    if (this.username.includes(" ") === false || !this.nameRegex.test(this.username)) {
      error.update(() => "Please enter your full name");
      return false;
    }
    return true;
  }

  public static get validName() {
    if (!this.username.length) {
      return null;
    }
    return this.nameRegex.test(this.username);
  }

  public static override onChange(e: any): void {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "name") {
        this.username = value;
      } else {
        super.onChange(e);
      }
    }
  }

  public static override async submit() {
    const name = this.username;
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const request = new GraphQLRequest({
      query: `
				query Signup($name: String! $email: String!, $password: String!) {
					signup(name: $name, email: $email, password: $password) {
						${publicUserFragment}
					}
				}
			`,
      variables: {
        name,
        email,
        password,
      },
    });
    const response = await request.send();
    return response.json();
  }
}

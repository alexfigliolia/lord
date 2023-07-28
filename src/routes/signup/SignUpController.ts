import { GraphQLRequest } from "$lib/GraphQLRequest";
import { LoginController, error } from "$lib/authentication/LoginController";
import { publicUserFragment } from "$lib/graphql/user";
import { SignUpValidators } from "./SignUpValidators";

export class SignUpController extends LoginController {
  username = "";
  businessName = "";

  public validateName() {
    if (!SignUpValidators.validName(this.username)) {
      error.update(() => "Please enter your full name");
      return false;
    }
    return true;
  }

  public validateBusinessName() {
    if (!SignUpValidators.validBusinessName(this.businessName)) {
      error.update(() => "Business names must be at least 3 characters");
      return false;
    }
    return true;
  }

  public override onChange(e: any): void {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "name") {
        this.username = value;
      } else if (name === "businessName") {
        this.businessName = value;
      } else {
        super.onChange(e);
      }
    }
  }

  public override async submit() {
    const name = this.username;
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const organization = this.businessName;
    const request = new GraphQLRequest({
      query: `
				query onBoard($name: String! $email: String!, $password: String!, $organization: String!) {
					onboard(name: $name, email: $email, password: $password, organization: $organization) {
						${publicUserFragment}
					}
				}
			`,
      variables: {
        name,
        email,
        password,
        organization,
      },
    });
    const response = await request.send();
    return response.json();
  }
}

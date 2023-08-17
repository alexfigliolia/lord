import type { GraphQLClientResponse } from "graphql-request/build/esm/types";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { LoginController, error } from "$lib/authentication/LoginController";
import { onboardQuery } from "$lib/graphql/authentication.gql";
import { SignUpValidators } from "./SignUpValidators";
import type { onBoard, onBoardVariables } from "$lib/schema/onBoard";

export class SignUpController extends LoginController<GraphQLClientResponse<onBoard>> {
  username = "";
  businessName = "";
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

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

  public override submit() {
    const name = this.username;
    const email = this.email.toLocaleLowerCase();
    const password = this.password;
    const organization = this.businessName;
    const request = new GraphQLRequest<onBoard, onBoardVariables>({
      query: onboardQuery,
      variables: {
        name,
        email,
        password,
        organization,
      },
    });
    return request.send();
  }
}

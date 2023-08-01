import { LoginValidators } from "$lib/authentication/LoginValidators";

export class SignUpValidators extends LoginValidators {
  public static nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  public static validName = (value: string) => {
    if (!value.length) {
      return null;
    }
    return !!value.match(this.nameRegex);
  };

  public static validBusinessName = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length > 3;
  };
}

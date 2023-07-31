export class Validators {
  static zipRegex = /^[0-9]*$/;
  static stateRegex = /^[a-zA-Z]*$/;
  static addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

  static baseValidator = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length > 2;
  };

  static validateAddress = (value: string) => {
    const baseResult = this.baseValidator(value);
    if (!baseResult) {
      return baseResult;
    }
    return this.addressRegex.test(value);
  };

  static validateState = (value: string) => {
    if (!value.length) {
      return null;
    }
    return this.stateRegex.test(value);
  };

  static validateZipCode = (value: string) => {
    if (!value.length) {
      return null;
    }
    return value.length === 5 && this.zipRegex.test(value);
  };
}

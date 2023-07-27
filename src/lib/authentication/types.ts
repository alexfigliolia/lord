export interface IVerifyCredentials {
  onError?: () => void;
  onSuccess?: (user: User) => User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

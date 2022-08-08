export interface loginResp {
  application: Application;
  response: Response;
}
interface Application {
  name: string;
  version: string;
}
interface Response {
  code: number;
  body: Body;
}
interface Body {
  token: Token;
  user: User;
}
interface Token {
  id: string;
  userId: number;
  createdAt: number;
  expiredAt: number;
  isExpired: boolean;
}
interface User {
  id: number;
  displayName: string;
  username: string;
  email: string;
  roles?: number[] | null;
  isActive: boolean;
  testimonialId: number;
  mobile: string;
}

import axios from "axios";
import { loginResp, Token } from "./types/loginResp";
const loginApi = "https://io.scelgozero.it/api/auth/login";
export const LoginManager = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  let testimonialId: number | null = null;
  let authToken: Token | null = null;

  const login = async () => {
    const resp: loginResp = (
      await axios.post(loginApi, {
        username,
        password,
      })
    ).data;
    authToken = resp.response.body.token;
    testimonialId = resp.response.body.user.testimonialId;
  };

  const getTestimonialId = () => {
    if (testimonialId === null) {
      throw Error("error: first login then get testimonialId");
    }
    return testimonialId;
  };

  const getAuthToken = () => {
    if (authToken === null) {
      throw Error("error: first login then get authToken");
    }
    return authToken;
  };

  return { login, getAuthToken, getTestimonialId };
};
